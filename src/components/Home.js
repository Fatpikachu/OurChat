import React, { useState } from 'react'
import AuthService from '../AuthService'
import Sidebar from './Sidebar'
import OpenConversation from './OpenConversation'
// import { ContactsProvider } from '../contexts/ContactsProvider'
// import { ConversationsProvider } from '../contexts/ConversationsProvider'
import { useConversations } from '../contexts/ConversationsProvider'
// import useLocalStorage from '../hooks/useLocalStorage'

export default function Home(props) {
  const handleLogout = () => {
    AuthService.logout();
    props.history.replace('/');
  }
  const { selectedConversation } = useConversations()
  console.log('selected conversation in home  ', selectedConversation)
  // selectedConversation = true;
  return (
    <>  
      {/* <ContactsProvider>
        <ConversationsProvider> */}
          {/* <button className='float-right' onClick={handleLogout}> Logout! </button> */}
          <div className='d-flex' style={{ height: '100vh '}}>
            <Sidebar />
            { selectedConversation && <OpenConversation /> }
          </div>
        {/* </ConversationsProvider>
      </ContactsProvider> */}
    </>  
  )
  
};