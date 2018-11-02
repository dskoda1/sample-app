import React, { Component } from 'react';

import { connect } from 'react-redux';

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
    return <h3>Hello!</h3>;
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
