import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

export default function OpenConversation() {
  const [text, setText] = useState('')
  const { sendMessage, selectedConversation } = useConversations()
  const setRef = useCallback( node => {
    if(node) {
      node.scrollIntoView({ smooth: true})
    }
  })
  function handleSubmit(e) {
    e.preventDefault()
    const time = moment().format('MM-DD-YYYY HH:mm')
    sendMessage(selectedConversation.recipients.map(r => r.id), text, time)
    setText('')
  }

  return(
    <div className="open-convo d-flex flex-column flex-grow-1" style={{ height: '88vh'}}>
      <div className="convo overflow-auto">
        <div className="d-flex flex-column px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage = selectedConversation.messages.length - 1 === index
            return (
              <div
                key={index}
                ref={lastMessage ? setRef : null}
                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}>
                <div className={
                  `rounded px-3 py-2 
                  ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                    {message.text}
                </div>
                <div className={`text-muted medium ${message.fromMe ? 'text-right' : ''}`}>
                <span className={`text-muted small`}>{message.time}</span> {message.fromMe ? 'You' : message.senderName}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
            <InputGroup>
              <Form.Control 
                as="textarea"
                className="rounded-0 send-txt"
                required 
                value={text}
                onChange={ e => setText(e.target.value)}
                style={{ height: '60px', resize: 'none' }}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                    handleSubmit(event);
                  }
                }}
              />
              <InputGroup.Append>
                <Button type="submit" className="rounded-0"><FontAwesomeIcon icon={faPaperPlane} />&nbsp;&nbsp;Send </Button>
              </InputGroup.Append>
            </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}
