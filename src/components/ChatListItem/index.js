import React from 'react'
import { NavLink } from 'react-router-dom'
import './index.css'

const ChatListItem = ({ name, chatID, text, image_url }) => (
  <li className="list-group-item">
    <NavLink to={`/threads/${chatID}`} activeClassName="active">
      <img className="thread-img" src={image_url} width="32" height="32" alt="User Avatar" />
      <div className="thread-text">
        <strong>{name}</strong>
        <p>{text}</p>
      </div>
    </NavLink>
  </li>
)

export default ChatListItem
