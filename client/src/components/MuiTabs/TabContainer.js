import * as React from 'react';
import Typography from '@material-ui/core/Typography';

const TabContainer = props => {
  return (
    <Typography
      component="div"
      dir={props.direction}
      style={{ padding: 8 * 3 }}
    >
      {props.children}
    </Typography>
  );
};

export default TabContainer;
