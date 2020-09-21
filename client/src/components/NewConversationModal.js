import React, { useState } from 'react'
import { Modal, Form, Button} from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import { useConversations } from '../contexts/ConversationsProvider'


export default function NewConversationModal({ closeModal }) {
  const [selected, setSelected] = useState([])
  const { contacts } = useContacts()
  const { createConversation } = useConversations()

  function handleCheckbox(contactId) {
    setSelected(prev =>{
      if(prev.includes(contactId)) {
        return prev.filter(prevId => {
          return contactId !== prevId
        })
      } else {
        return [...prev, contactId]
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    createConversation(selected)
    closeModal()
  }

  return (
    <>
      <Modal.Header closeButton> Create Conversation </Modal.Header>  
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map( contact => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selected.includes(contact.id)}
                label={contact.name}
                onChange={()=>{
                  handleCheckbox(contact.id)
                }}
              />
              </Form.Group>
          ))}
          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Body>
    </>
  )
}