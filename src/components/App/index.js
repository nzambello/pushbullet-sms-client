import React, { Component } from 'react'
import ChatList from '../ChatList'
import { messages } from '../../messages'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
    const getImageURL = recipients => {
      if (recipients.length === 1) {
        if (recipients[0].image_url) {
          return recipients[0].image_url
        } else {
          return 'noimage'
        }
      } else {
        return 'group'
      }
    }

    const msg = messages.threads.map(thr => {
      return {
        name: thr.recipients
          .map(rep => {
            return rep.name
          })
          .join(', '),
        image_url: getImageURL(thr.recipients),
        text: thr.latest.body,
      }
    })

    this.setState({ messages: msg })
  }

  render() {
    return (
      <div className="app-wrapper">
        <ChatList messages={this.state.messages} />
      </div>
    )
  }
}

export default App
