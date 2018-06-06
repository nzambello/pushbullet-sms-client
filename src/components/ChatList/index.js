import React, { Component } from 'react'
import ChatListItem from '../ChatListItem'
import { matchPath, withRouter } from 'react-router'
import matchSorter from 'match-sorter'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEnvelope from '@fortawesome/fontawesome-free-regular/faEnvelope'
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
    }
  }

  onChangeFilter = e => {
    this.setState({
      filterPattern: e.target.value,
    })
  }

  render() {
    const { location, messages } = this.props
    const matchRoot = matchPath(location.pathname, {
      path: '/',
      exact: true,
      strict: false,
    })
    const cssClass = matchRoot && matchRoot.isExact ? '' : ' chat-opened'

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
        </div>
        <ul>
          {matchSorter(messages, this.state.filterPattern, { keys: ['name'] }).map(el => (
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
