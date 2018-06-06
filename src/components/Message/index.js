import React from 'react'
import './index.css'

const Message = ({ timestamp, direction, body, status }) => {
  let date = new Date(timestamp * 1000)
  let time = ('0' + date.getHours()).substr(-2) + ':' + ('0' + date.getMinutes()).substr(-2)
  let day = ('0' + date.getDate()).substr(-2) + '/' + ('0' + date.getMonth()).substr(-2) + '/' + date.getFullYear()
  return (
    <div className="message-wrapper">
      <div className={`message-body ${direction}`}>
        <span>{body}</span>
        <div className="message-time">
          <span>{day}</span>&nbsp;&minus;&nbsp;
          <span>{time}</span>
        </div>
      </div>
    </div>
  )
}

export default Message
