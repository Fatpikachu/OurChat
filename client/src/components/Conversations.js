import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'


export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations()
  console.log('the conversationssss ', conversations)
  return (
    <ListGroup variant="flush">
      {conversations.map( (conversation, index) => (
          <ListGroup.Item 
            key={index} 
            action
            onClick={() => selectConversationIndex(index)}
            active={conversation.selected}
          >
            {conversation.recipients.map(recipient => recipient.name).join(', ')}
          </ListGroup.Item>
      ))}
    </ListGroup>
  )
}