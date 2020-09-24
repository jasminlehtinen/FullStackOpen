import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([ 
    { name: 'Ada Lovelace', number: '040-1234567' },
    { name: 'Margaret Hamilton', number: '040-9876543' },
    { name: 'Grace Hopper', number: '050-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')  
  const [search, setSearch] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    let isDuplicate = false
    persons.forEach(function(element) {
      if (element.name === personObject.name) {
        isDuplicate = true
        return false
      }
    })

    if (!isDuplicate) {
      setPersons(persons.concat(personObject))
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
      <h2>Phonebook</h2>
      <div>filter: <input value={search} onChange={handleSearchName}/></div>

      <h2>Add a new contact</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNewName}/></div>
        <div>number: <input value={newNumber} onChange={handleNewNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>

      <h2>Numbers</h2>
      <div>
        <ul>
          {searchPhonebook.map(person => 
            <li key={person.name}>{person.name} {person.number}</li>
          )}
        </ul>
      </div>
    </>
  )
}

export default App
