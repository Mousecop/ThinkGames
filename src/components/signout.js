import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/action';
import Header from '../header';

export class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return (
      <div className="signoutContainer">
        <Header />
        <div className="message">come back soon!</div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
    logout() {
        dispatch(actions.logoutUser())
    }
})

export default connect(null, mapDispatchToProps)(Signout);