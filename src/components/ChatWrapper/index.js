import React from 'react'
import ChatView from '../ChatView'
import { chat } from '../../thread'

const ChatWrapper = ({ id }) => {
  let messages = chat.thread
  return <ChatView id="2" name="Il Balivo" messages={messages} />
}

export default ChatWrapper
