import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'

export default function NewContactModal({ closeModal }) {
  const idRef = useRef()
  const nameRef = useRef()
  const { addContact } = useContacts()

  function handleSubmit(e){
    e.preventDefault()
    addContact(idRef.current.value)
    closeModal()
  }

  return (
    <>
      <Modal.Header closeButton> New Contact </Modal.Header>  
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label> Id </Form.Label>
            <Form.Control type='text' ref={idRef} required />
          </Form.Group>
          <Button type="submit">Add</Button>
        </Form>
      </Modal.Body>
    </>
  )
}