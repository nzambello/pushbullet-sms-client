import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { matchPath, Redirect } from 'react-router'
import ChatList from '../ChatList'
import ChatWrapper from '../ChatWrapper'
import Notifications from '../Notifications'
import Cookies from 'js-cookie'
import Login from '../Login'
import './index.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      apiToken: null,
      loggedIn: false,
      status: 'ok',
    }
  }

  onError = err => {
    this.setState({ status: err })
  }

  logout = () => {
    this.setState({ apiToken: null, loggedIn: false })
    Cookies.remove('pushbulletAPIToken')
  }

  render() {
    const loginURL =
      process.env.NODE_ENV === 'production'
        ? 'https://www.pushbullet.com/authorize?client_id=pEuCGqQL1iHr0H5kCBWphnQ0Ik4iTtaf&redirect_uri=https%3A%2F%2Fnzambello.github.io%2Fpushbullet-sms-client%2Fbuild%2F&response_type=token&scope=everything'
        : 'https://www.pushbullet.com/authorize?client_id=hvBQv0FoBTWp3yAPRezhBA1c2eJyJraP&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=token&scope=everything'

    const loginMatch = matchPath(window.location.pathname, {
      path: '/login',
      exact: true,
      strict: false,
    })

    if (loginMatch && loginMatch.isExact) {
      let token = window.location.hash.trim().replace(/#access_token=/, '')
      if (token && token.length > 0) {
        Cookies.set('pushbulletAPIToken', token, { expires: 7, path: '' })
        this.state.apiToken = token
        this.state.loggedIn = true
      }
    }

    const chat = ({ match }) => <ChatWrapper id={match.params.id} token={this.state.apiToken} />
    const loggedInRedirect = () => <Redirect to="/threads" />

    return (
      <Router>
        <div className="app-wrapper">
          {this.state.loggedIn &&
            this.state.status === 'ok' && (
              <React.Fragment>
                <Notifications token={this.state.apiToken} />
                <ChatList token={this.state.apiToken} onError={this.onError} logout={this.logout} />
                <Route path="/threads/:id" component={chat} />
                <Route path="/login" component={loggedInRedirect} />
              </React.Fragment>
            )}

          {!this.state.loggedIn &&
            this.state.status === 'ok' && (
              <React.Fragment>
                <div>ERROR: you're not logged in</div>
                <Login redirectTo={loginURL} />
              </React.Fragment>
            )}

          {this.state.status !== 'ok' && (
            <React.Fragment>
              <div className="app-error">
                <p>{JSON.stringify(this.state.status)}</p>
              </div>
            </React.Fragment>
          )}
        </div>
      </Router>
    )
  }
}

export default App
