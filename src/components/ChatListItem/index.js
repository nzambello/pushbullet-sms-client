import React from 'react'
import './index.css'

const ChatListItem = ({ name, text, image_url }) => (
  <li className="list-group-item">
    <img className="img-circle media-object pull-left" src={image_url} width="32" height="32" alt="User Avatar" />
    <div className="media-body">
      <strong>{name}</strong>
      <p>{text}</p>
    </div>
  </li>
)

export default ChatListItem
