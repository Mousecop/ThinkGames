import React from 'react';
import io from 'socket.io-client';
import moment from 'moment';
import Header from './header'; //eslint-disable-line no-unused-vars
// import SideBar from './chat-sidebar';
import { connect } from 'react-redux';
import * as actions from '../actions/action';
import '../styles/chat.css';
import '../styles/grid.css';

class Chat extends React.Component {
  constructor(props){
    super(props);
    this.state = { messages: []}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    this.socket = io('/');
    this.scrollToBottom();
    this.socket.on('message', (message) => {
      this.setState({messages: [...this.state.messages, message]})
      this.props.newMessage(message)
    })
    this.socket.on('add user', this.props.currentUser)
  }

  scrollToBottom() {
    const messages = this.refs.messages;
    messages.scrollTop = messages.scrollHeight;
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleSubmit(event) {
    this.socket.emit('add user', this.props.currentUser)
    const body = event.target.value;
    if(event.keyCode === 13 && body) {
      const message = {
        body,
        from: 'Me',
        createdAt: moment().format('MM/D/YYYY hh:mm:ss')
      }
      this.setState({messages: [...this.state.messages, message]})
      this.socket.emit('message', (body))
      this.props.newMessage(message)
      event.target.value = '';
    }
  }

  render() {
    const fromStyle = {
      color: '#2C8C99',
      fontSize: '21px',
      marginRight: '12px'
    }

    const messages = this.state.messages.map((message, index)=> {
      return (<div key={index}>
        <p className="message"><b><span style={fromStyle}>{message.from}</span> </b>{message.createdAt}<br/><br/>
        <span className="message-body">{message.body}</span></p><hr/></div>
      )
    })

    const sortedMessageHistory = this.props.messages[0].sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    const messageHistory = sortedMessageHistory.map((message, index) =>{
      return (<div key={index}>
        <p className="message"><b><span style={fromStyle}>{message.from}</span> </b>{moment(message.createdAt).format('MM/D/YYYY hh:mm:ss')}<br/><br/>
        <span className="message-body">{message.body}</span></p><hr/></div>
      )
    });
    
    return (
      <div className="main-container row">
        <Header />
        <div className="col-12">
          <div className="chat-container ">
            <h1 className="chat-title">#general</h1>
            <div className="chat-messages" ref="messages">
              {messageHistory}
              {messages}
            </div>
            <div className="chat-input">
              <input type="text" placeholder="Enter a message.." onKeyUp={this.handleSubmit} className="message-input" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser : state.currentUser,
  messages: state.messages
});

const mapDispatchToProps = (dispatch) => ({
  newMessage(message) {
    dispatch(actions.newMessage(message))
  },
  messageHistory() {
    dispatch(actions.fetchMessages())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat);