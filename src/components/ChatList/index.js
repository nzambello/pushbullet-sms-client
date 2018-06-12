import React, { Component } from 'react'
import ChatListItem from '../ChatListItem'
import { matchPath, withRouter } from 'react-router'
import matchSorter from 'match-sorter'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEnvelope from '@fortawesome/fontawesome-free-regular/faEnvelope'
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt'
import user from './user.png'
import group from './group.png'
import './index.css'

const getImageURL = data => {
  switch (data) {
    case 'noimage':
      return user

    case 'group':
      return group

    default:
      return data
  }
}

class ChatList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filterPattern: '',
      messages: [],
    }
  }

  fetchThreads = () => {
    const token = this.props.token
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

    fetch('https://api.pushbullet.com/v2/permanents/ujEZP2uT0Y8sjAiVsKnSTs_threads', {
      headers: { 'Access-Token': token },
    })
      .then(response => response.json())
      .then(data => {
        const msg = data.threads.map(thr => {
          let userThread = {
            id: thr.id,
            name: thr.recipients
              .map(rep => {
                return rep.name
              })
              .join(', '),
            image_url: getImageURL(thr.recipients),
            text: thr.latest.body,
          }

          window.localStorage.setItem(userThread.id.toString(), JSON.stringify(userThread))
          return userThread
        })

        this.setState({ messages: msg })
      })
      .catch(error => {
        this.props.onError(error)
      })
  }

  componentDidMount() {
    this.fetchThreads()
    document.addEventListener('newMessage', this.fetchThreads)
  }

  onChangeFilter = e => {
    this.setState({
      filterPattern: e.target.value,
    })
  }

  render() {
    const { location } = this.props
    const matchRoot = matchPath(location.pathname, {
      path: '/threads/:id',
      exact: true,
      strict: false,
    })

    const cssClass = matchRoot && matchRoot.isExact ? ' chat-opened' : ''

    return (
      <div className={`list-group${cssClass}`}>
        <div className="list-group-header">
          <input
            className="list-filter"
            type="search"
            placeholder="Search for someone"
            onChange={this.onChangeFilter}
          />
          <button className="new-message" title="New message">
            <FontAwesomeIcon icon={faEnvelope} />
          </button>
          <button className="logout" title="Logout" onClick={this.props.logout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
        <ul>
          {matchSorter(this.state.messages, this.state.filterPattern, { keys: ['name'] }).map(el => (
            <ChatListItem
              key={el.name}
              chatID={el.id}
              name={el.name}
              text={el.text}
              image_url={getImageURL(el.image_url)}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default withRouter(ChatList)
