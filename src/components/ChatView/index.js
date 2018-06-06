import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faArrowLeft from '@fortawesome/fontawesome-free-solid/faArrowLeft'
import Message from '../Message'
import './index.css'
import userImg from '../ChatList/user.png'

class ChatView extends Component {
  componentDidMount() {
    let list = document.querySelector('.chat-sms-list')
    list.scrollTop = list.scrollHeight
  }

  render() {
    const { id, name = 'Il Balivo', image_url, messages = [] } = this.props
    return (
      <div className="chat-view">
        <div className="chat-header">
          <Link to="/" title="Back">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h2>{name}</h2>
          <img className="user-img" src={image_url ? image_url : userImg} width="32" height="32" alt="User Avatar" />
        </div>
        <div className="chat-sms-list">
          {messages.map(sms => (
            <Message
              key={sms.id}
              timestamp={sms.timestamp}
              direction={sms.direction}
              body={sms.body}
              status={sms.status}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default ChatView
