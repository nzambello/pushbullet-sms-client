import React, { Component } from 'react'
import Cookies from 'js-cookie'

class Login extends Component {
  componentDidMount() {
    const token = Cookies.get('pushbulletAPIToken')
    if (token) {
      window.location = `${window.location.origin}/login#access_token=${token}`
    } else {
      window.location = this.props.redirectTo
    }
  }

  render() {
    return <div>Redirecting...</div>
  }
}

export default Login
