import React, { useContext, useState, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'
import { useSocket } from './SocketProvider';

const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const [selectedConversationIndex , setSelectedConversationIndex] = useState(0)
  const { contacts } = useContacts()
  const socket = useSocket()
  console.log('the socket in conversatinprovider: ', socket)
  function createConversation(recipients) {
    setConversations(prev => {
      // recipients = recipients.map((recip) => {
      //   return contacts.find(contact => {
      //     return contact.id === recip
      //   })
      // })
      // return [...prev, { recipients, messages: [] }]
      return [...prev, {recipients, messages: [] }]
    })
  }

  const addMessageToConversation = useCallback(({ recipients, text, sender}) => {
    setConversations( prevConv => {
      let madeChange = false
      const newMessage = { sender, text }
      const newConversations = prevConv.map( conversation => {
        if(arrayEquality(conversation.recipients, recipients)){
          madeChange = true
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage]
          }
        }
        return conversation
      })
      if(madeChange){
        return newConversations
      } else {
        return [...prevConv, { recipients, messages: [newMessage] }]
      }
    })
  }, [setConversations])

  useEffect(() => {
    if(socket == null) return
    socket.on('receive-message', addMessageToConversation)

    return () => socket.off('receive-message')
  }, [socket, addMessageToConversation])

  function sendMessage(recipients, text) {
      socket.emit('send-message', {recipients, text})
      addMessageToConversation({recipients, text, sender: id})
  }

  const formattedConversations = conversations.map((conversation, index) => {

    const recipients = conversation.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        return contact.id === recipient
      })
      const name = (contact && contact.name) || recipient
      return { id: recipient, name }
    })

    // console.log('the recipients~~~ ', recipients)

    const messages = conversation.messages.map(message => {
      const contact = contacts.find(contact => {
        return contact.id === message.sender
      })
      const name = (contact && contact.name) || message.sender
      const fromMe = id === message.sender
      return { ...message, senderName: name, fromMe }
    })
    
    const selected = index === selectedConversationIndex
    return { ...conversation, messages, recipients, selected }
  })


  const value = {
    conversations: formattedConversations,
    createConversation,
    selectConversationIndex: setSelectedConversationIndex,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage
  }



  
  return(
    <ConversationsContext.Provider value={ value }>
      {children}
    </ConversationsContext.Provider>
  )
}

function arrayEquality(a, b){
  if(a.length !== b.length) return false
  a.sort()
  b.sort()
  return a.every((element, index) => {
     return element === b[index]
  })
}