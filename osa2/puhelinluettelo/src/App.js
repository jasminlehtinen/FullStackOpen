import React, { useState, useEffect } from 'react'
import contactService from './services/contacts'

const Header = ({ text }) => {
  return (
    <h2>{text}</h2>
  )
}

const Subheader = ({ text }) => {
  return (
    <h3>{text}</h3>
  )
}

const Filter = ({ search, handleSearchName }) => {
  return (
    <div>filter: <input value={search} onChange={handleSearchName}/></div>
  )
}

const ContactForm = ({ addContact, newName, handleNewName, newNumber, handleNewNumber }) => {
  return (
    <form onSubmit={addContact}>
      <div>name: <input value={newName} onChange={handleNewName}/></div>
      <div>number: <input value={newNumber} onChange={handleNewNumber}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const ContactList = ({ searchPhonebook }) => {
  return (
    <div>
      {searchPhonebook.map(person => 
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

const App = () => {
  const header = 'Phonebook'
  const firstSubheader = 'Add a new contact'
  const secondSubheader = 'Numbers'

  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')  
  const [search, setSearch] = useState('')

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setContacts(initialContacts)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber,
      id: contacts.length + 1
    }

    let isDuplicate = false
    contacts.forEach(function(element) {
      if (element.name === contactObject.name) {
        isDuplicate = true
        return false
      }
    })

    if (!isDuplicate) {
      contactService
        .create(contactObject)
        .then(returnedContact => {
          setContacts(contacts.concat(returnedContact))
          setNewName('')
          setNewNumber('')
        })
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchName = (event) => {
    setSearch(event.target.value)
  }

  const searchPhonebook = contacts.filter(contact => contact.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <Header text={header} />
      <Filter search={search} handleSearchName={handleSearchName} />
      <Subheader text={firstSubheader} />
      <ContactForm addContact={addContact} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <Subheader text={secondSubheader} />
      <ContactList searchPhonebook={searchPhonebook} />
    </>
  )
}

export default App
