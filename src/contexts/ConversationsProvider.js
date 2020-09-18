import React, { useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const [selectedConversationIndex , setSelectedConversationIndex] = useState(0)
  const { contacts } = useContacts()
  // console.log('THE ID :   ', id)
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

  function addMessageToConversation({ recipients, text, sender}) {
    setConversations( prevConv => {
      let madeChange = false
      const newMessage = { sender, text }
      console.log('the prevConv  : ', prevConv)
      console.log('the recipients:  ', recipients)
      const newConversations = prevConv.map( conversation => {
        if(arrayEquality(conversation.recipients, recipients)){
          madeChange = true
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage]
          }
        }
        console.log('###### message was set')
        return conversation
      })
      if(madeChange){
        return newConversations
      } else {
        return [...prevConv, { recipients, messages: [newMessage] }]
      }
    })
  }

  function sendMessage(recipients, text) {
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