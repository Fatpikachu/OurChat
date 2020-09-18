import React, { useContext } from 'react'
import axios from 'axios'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext()

export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage('contacts')
  const userID = localStorage.getItem('id')
  function addContact(newContact){
    const userID = localStorage.getItem('id');
    axios.post('http://localhost:3000/contacts', {
        id: userID,
        newContact: newContact
    }).then((updatedContacts) => {
      axios.get(`http://localhost:3000/contacts/${userID}`)
      .then( (user) => {
        setContacts(user.data.contacts)
        })
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