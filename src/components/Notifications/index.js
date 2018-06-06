import React, { Component } from 'react'
import { apiKey } from './secret.js'

class Notifications extends Component {
  constructor(props) {
    super(props)

    this.state = {
      websocket: null,
      status: 'disconnected',
    }
  }

  componentDidMount() {
    let websocket = this.state.websocket

    if (websocket !== null) {
      websocket.close()
    }

    websocket = new WebSocket(`wss://stream.pushbullet.com/websocket/${apiKey.token}`)

    websocket.onopen = () => {
      console.log('WebSocket open')
      this.setState({ status: 'open' })
    }
    Notification.requestPermission()

    websocket.onmessage = function(e) {
      let data = JSON.parse(e.data)
      if (data.type === 'push' && data.push.notifications) {
        let message = data.push.notifications[0]
        console.log(JSON.stringify(message))

        new Notification(`Message from ${message.title}`, {
          title: `Pushbullet: new message from ${message.title}`,
          body: message.body,
        })
      }
    }

    websocket.onerror = function(e) {
      console.log('WebSocket error')
    }

    websocket.onclose = function(e) {
      console.log('WebSocket close')
    }
  }

  render() {
    return (
      <div id="websocket-status" className="sr-only">
        <span>{this.state.status}</span>
      </div>
    )
  }
}

export default Notifications
