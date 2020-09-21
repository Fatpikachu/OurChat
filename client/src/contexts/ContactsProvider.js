import React, { useContext } from 'react'
import axios from 'axios'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext()
const heroku = 'https://mechat-fatkid.herokuapp.com'
const localEndpoint = 'http://localhost:3000'

export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage('contacts')
  const [id, setID] = useLocalStorage('id')
  function addContact(newContact){
    axios.post(`${heroku}/contacts`, {
        id: id,
        newContact: newContact
    }).then((updatedContacts) => {
      axios.get(`${heroku}/contacts/${id}`)
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