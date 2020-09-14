import React, { useContext } from 'react'
import axios from 'axios'

const ContactsContext = React.createContext()

export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {
  // const [contacts, setContacts] = localStorage.getItem('contacts')
  const contacts = localStorage.getItem('contacts')
  console.log('the contacts>>>: ', contacts)
  function addContact(newContact){
    const userID = localStorage.getItem('id');
    axios.post('http://localhost:3000/contacts', {
        id: userID,
        newContact: newContact
    }).then(() => {
      console.log('sucessfully added new contact')
    }).catch((err) => {
      console.log(err)
    })
  }

  return(
    <ContactsContext.Provider value={{ contacts, addContact }}>
      {children}
    </ContactsContext.Provider>
  )
}