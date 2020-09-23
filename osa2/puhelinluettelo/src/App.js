import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([ { name: 'Arto Hellas', number: '040-1231244' } ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')  
  
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

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNewName}/></div>
        <div>number: <input value={newNumber} onChange={handleNewNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <p key={person.name}>{person.name} {person.number}</p>
        ))}
      </div>
    </>
  )
}

export default App
