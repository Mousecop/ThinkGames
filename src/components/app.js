import React from 'react';
import io from 'socket.io-client';
import moment from 'moment';
import Login from './login'; //eslint-disable-line no-unused-vars
import Signup from './signup'; //eslint-disable-line no-unused-vars
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { messages: []}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.socket = io('/');
    this.socket.on('message', (message) => {
      this.setState({messages: [...this.state.messages, message]})
    })
    this.socket.on('add user', this.props.currentUser)
  }

  handleSubmit(event) {
    const body = event.target.value;
    if(event.keyCode === 13 && body) {
      const message = {
        body,
        from: 'me',
        createdAt: moment().format('MM/D/YYYY hh:mm:ss')
      }
      console.log('message', message)
      console.log('current User', this.props.currentUser)
      this.setState({messages: [...this.state.messages, message]})
      this.socket.emit('add user', this.props.currentUser)
      this.socket.emit('message', (body))
      event.target.value = '';
    }
  }

  render() {
    const messages = this.state.messages.map((message, index) =>{
      return <p key={index}>{message.createdAt} <b>{message.from}: </b>{message.body}</p>
    })
    return (
      <div>
        <h1>ThinkGames</h1>
        {messages}
         <input type="text" placeholder="Enter a message.." onKeyUp={this.handleSubmit} />
         {/*<Signup />*/}
         <Login />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser : state.currentUser,
  messages: state.messages
})

export default connect(mapStateToProps)(App);