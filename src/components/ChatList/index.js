import React, { Component } from 'react'
import ChatListItem from '../ChatListItem'
import matchSorter from 'match-sorter'
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
    const { messages } = this.props

    return (
      <ul className="list-group">
        <li className="list-group-header">
          <input className="form-control" type="text" placeholder="Search for someone" onChange={this.onChangeFilter} />
        </li>
        {matchSorter(messages, this.state.filterPattern, { keys: ['name'] }).map(el => (
          <ChatListItem key={el.name} name={el.name} text={el.text} image_url={getImageURL(el.image_url)} />
        ))}
      </ul>
    )
  }
}

export default ChatList
