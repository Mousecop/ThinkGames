import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div className="appContainer">
        {this.props.children}
      </div>
    );
  }
}