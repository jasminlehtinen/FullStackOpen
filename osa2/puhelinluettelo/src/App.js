import React, { useState } from 'react'

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

  const [persons, setPersons] = useState([ 
    { name: 'Ada Lovelace', number: '040-1234567' },
    { name: 'Margaret Hamilton', number: '040-9876543' },
    { name: 'Grace Hopper', number: '050-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')  
  const [search, setSearch] = useState('')
  
  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber
    }

    let isDuplicate = false
    persons.forEach(function(element) {
      if (element.name === contactObject.name) {
        isDuplicate = true
        return false
      }
    })

    if (!isDuplicate) {
      setPersons(persons.concat(contactObject))
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

  const searchPhonebook = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

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
