import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

const initialState = {};

class HomePage extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentWillMount() {}

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return <Typography variant="display1">Hello!</Typography>;
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
