import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
const moment = require('moment');

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { messages: [] }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.socket = io('/');
    this.socket.on('message', message => {
      this.setState({messages: [message,...this.state.messages]})
    })
  }

  handleSubmit(event) {
    const body = event.target.value;
    if(event.keyCode === 13 && body) {
      const message = {
        body,
        from: 'me',
        createdAt: moment().format('MM/D/YYYY hh:mm:ss')
      }
      console.log(message)
      this.setState({messages: [...this.state.messages, message]})
      this.socket.emit('message', body)
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
      </div>
    )
  }
}

export default App;