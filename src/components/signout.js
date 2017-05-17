import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/action';
import Header from './header'; //eslint-disable-line no-unused-vars

export class Signout extends React.Component {
  componentWillMount() {
    this.props.logout();
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