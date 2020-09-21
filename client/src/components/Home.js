import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import AuthService from '../AuthService'
import Sidebar from './Sidebar'
import OpenConversation from './OpenConversation'
// import { ContactsProvider } from '../contexts/ContactsProvider'
// import { ConversationsProvider } from '../contexts/ConversationsProvider'
import { useConversations } from '../contexts/ConversationsProvider'
// import useLocalStorage from '../hooks/useLocalStorage'
import Ribbon from './Ribbon';

export default function Home(props) {
  const { selectedConversation } = useConversations()
  console.log('selected conversation in home  ', selectedConversation)
  // selectedConversation = true;
  return (
    <>  
      <div className='d-flex' style={{ height: '100vh '}}>
        <Sidebar />
        <Ribbon />
        { selectedConversation && <OpenConversation /> }
      </div>
    </>  
  ) 
};