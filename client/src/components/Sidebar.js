import React, { useState } from 'react'
import { Tab, Nav, Button, Modal} from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from './Contacts'
import NewConversationModal from './NewConversationModal'
import NewContactModal from './NewContactModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faUsers } from '@fortawesome/free-solid-svg-icons'
const CONVERSATIONS_KEY = 'Conversations'
const CONTACTS_KEY = 'Contacts'

export default function Sidebar() {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const conversationsOpen = activeKey === CONVERSATIONS_KEY
  const [modalOpen, setModalOpen] = useState(false)

  function closeModal(){
    setModalOpen(false)
  }

  return (
    <div style={{ width: '300px'}} id='side-bar' className='side-bar d-flex flex-column'>
     <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
       <Nav variant='tabs' className="justify-content-center nav-fill">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}><FontAwesomeIcon icon={faComments} /> &nbsp;Conversations </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}><FontAwesomeIcon icon={faUsers} /> &nbsp;Contacts </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-right small">
          Your Id: <span className="text-muted">{localStorage.getItem('id')}</span>
         <div> Screen Name: <span className="text-muted">{localStorage.getItem('screenName')}</span></div>
        </div>
        <Button onClick={()=> setModalOpen(true)} className="rounded-0">
            {conversationsOpen ? 'Start Conversation' : 'Add Contact' }
        </Button>
     </Tab.Container>

     <Modal show={modalOpen} onHide={closeModal}>
       {
         conversationsOpen ?
          <NewConversationModal closeModal={closeModal} /> :
          <NewContactModal closeModal={closeModal}/> 
        }
    </Modal>
    </div>
    )
}