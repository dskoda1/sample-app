import * as React from 'react';
import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { createStyles, Theme } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { useMutation } from '@apollo/react-hooks';

import {
  CreateCategoryData,
  CreateCategoryMutation,
  CreateCategoryVariables,
} from 'apps/finance/Categories/queries';
import { showNotification } from 'redux/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
    },
  })
);

const AddNewCategory: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  function handleClickOpen() {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        size={'small'}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <NewCategoryPopup open={open} handleClose={handleClose} />
    </>
  );
};

interface NewCategoryProps {
  open: boolean;
  handleClose: () => void;
}

const NewCategoryPopup: React.FC<NewCategoryProps> = ({
  open,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [saveCategory, res] = useMutation<
    CreateCategoryData,
    CreateCategoryVariables
  >(CreateCategoryMutation, {
    variables: {
      name: text,
    },
    refetchQueries: ['getCategoriesQuery'],
  });

  let disableCreateButton = false;

  // Response came back and there was an error
  if (res.called && res.data && !res.data.createCategory.success) {
    disableCreateButton = true;
    dispatch(showNotification('Failed to create new category'));
  }
  // Response came back
  if (res.called && res.data && res.data.createCategory.success) {
    res.called = false;
    handleClose();
    setText('');
    dispatch(showNotification('Successfully created new category.'));
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <form autoComplete="off">
        <DialogTitle>{`Create new category`}</DialogTitle>
        <DialogContent>
          <NewCategoryForm
            text={text}
            loading={res.loading}
            response={res.data}
            setText={setText}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            disabled={disableCreateButton}
            onClick={e => {
              e.preventDefault();
              saveCategory();
            }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

interface NewCategoryFormProps {
  loading: boolean;
  error?: string;
  response?: {
    createCategory: {
      message: string;
    };
  };
  text: string;
  setText: (text: string) => void;
}

const NewCategoryForm: React.FunctionComponent<NewCategoryFormProps> = props => {
  if (props.loading) {
    return <>Saving</>;
  }
  if (props.error) {
    return <>Failed to save, please try again.</>;
  }
  const hasError = !!(props.response && props.response.createCategory.message);
  return (
    <>
      <TextField
        error={hasError}
        id="new-category-textfield"
        label="Name"
        value={props.text}
        onChange={e => props.setText(e.target.value)}
        fullWidth
      />
      {hasError && (
        <Typography variant="subtitle1">
          Failed to save: $
          {props.response ? props.response.createCategory.message : ''}
        </Typography>
      )}
    </>
  );
};

export default AddNewCategory;
