import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { messages } from '../../messages'
import ChatList from '../ChatList'
import ChatWrapper from '../ChatWrapper'
import Notifications from '../Notifications'
import './index.css'

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
        id: thr.id,
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
    const chat = ({ match }) => <ChatWrapper id={match.params.id} />

    return (
      <Router>
        <div className="app-wrapper">
          <Notifications />
          <ChatList messages={this.state.messages} />
          <Route path="/threads/:id" component={chat} />
        </div>
      </Router>
    )
  }
}

export default App
