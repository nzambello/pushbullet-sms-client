import React, { Component } from 'react'
import ChatView from '../ChatView'

class ChatWrapper extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.id,
      messages: [],
    }
  }

  fetchMessages = () => {
    const token = this.props.token

    fetch(`https://api.pushbullet.com/v2/permanents/ujEZP2uT0Y8sjAiVsKnSTs_thread_${this.state.id}`, {
      headers: { 'Access-Token': token },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ messages: data.thread })
      })
  }

  componentDidMount() {
    this.fetchMessages()

    document.addEventListener('newMessage', this.fetchMessages)
  }

  componentDidUpdate() {
    if (this.state.id !== this.props.id) {
      this.setState({ messages: [] }, this.setState({ id: this.props.id }, () => this.fetchMessages()))
    }

    return false
  }

  render() {
    return <ChatView id={this.state.id} name="Il Balivo" messages={this.state.messages} />
  }
}

export default ChatWrapper
