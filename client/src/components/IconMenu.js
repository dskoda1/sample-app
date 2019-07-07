import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default class IconMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = choice => () => {
    this.props.onSelect(choice);
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <this.props.iconClass />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => this.setState({ anchorEl: null })}
        >
          {this.props.choices.map(({ choice, text }) => (
            <MenuItem key={choice} onClick={this.handleClose(choice)}>
              {text}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

IconMenu.propTypes = {
  iconClass: PropTypes.object.isRequired,
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      choice: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};
