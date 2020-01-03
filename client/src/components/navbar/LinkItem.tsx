import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { ListItemText } from '@material-ui/core';

interface LinkItemProps {
  linkTo: string;
  text: string;
  children: React.ReactNode;
}

const LinkItem: React.FunctionComponent<LinkItemProps> = props => (
  <Link to={props.linkTo} style={{ textDecoration: 'none', color: '#000' }}>
    <ListItem button>
      <ListItemIcon>{props.children}</ListItemIcon>
      <ListItemText primary={props.text} />
    </ListItem>
  </Link>
);

export default LinkItem;
