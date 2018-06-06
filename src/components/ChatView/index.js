import React from 'react'
import { Link } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faArrowLeft from '@fortawesome/fontawesome-free-solid/faArrowLeft'
import './index.css'
import userImg from '../ChatList/user.png'

const ChatView = ({ id, name = 'Il Balivo', image_url }) => (
  <div className="chat-view">
    <div className="chat-header">
      <Link to="/" title="Back">
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <h2>{name}</h2>
      <img className="user-img" src={image_url ? image_url : userImg} width="32" height="32" alt="User Avatar" />
    </div>
    <div className="chat-sms-list">
      <p>Hi there</p>
    </div>
  </div>
)

export default ChatView
