import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope'
import faArrowLeft from '@fortawesome/fontawesome-free-solid/faArrowLeft'
import Spinner from 'react-spinkit'
import Message from '../Message'
import group from '../ChatList/group.png'
import userImg from '../ChatList/user.png'
import './index.css'

class ChatView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: '',
    }
  }

  componentDidMount() {
    let list = document.querySelector('.chat-sms-list')
    list.scrollTop = list.scrollHeight
  }

  onTextChange = e => {
    this.setState({ text: e.target.value })
  }

  sendSMS = () => {
    let content = this.state.text
    this.setState({ text: '' })
    this.props.sendSMS(content)
  }

  render() {
    const getImageURL = data => {
      switch (data) {
        case 'noimage':
          return userImg

        case 'group':
          return group

        default:
          return data
      }
    }

    const user = JSON.parse(window.localStorage.getItem(this.props.id.toString()))
    const btnClassName = this.state.text.length > 0 ? 'new-message' : 'new-message disabled'

    return (
      <div className="chat-view">
        <div className="chat-header">
          <Link to="/threads" title="Back">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h2>{user.name}</h2>
          <img className="user-img" src={getImageURL(user.image_url)} width="32" height="32" alt="User Avatar" />
        </div>
        <div className="chat-sms-list">
          {this.props.messages.length > 0 &&
            this.props.messages.map(sms => (
              <Message
                key={sms.id}
                timestamp={sms.timestamp}
                direction={sms.direction}
                body={sms.body}
                status={sms.status}
              />
            ))}
          {this.props.messages.length === 0 && (
            <div className="chat-loading">
              <Spinner name="line-scale" color="#4ab367" />
            </div>
          )}
        </div>
        <div className="chat-sms-new">
          <input placeholder="Type a text message" onChange={this.onTextChange} value={this.state.text} />
          <button className={btnClassName} title="Send message" onClick={this.sendSMS}>
            <FontAwesomeIcon icon={faEnvelope} />
          </button>
        </div>
      </div>
    )
  }
}

export default ChatView
