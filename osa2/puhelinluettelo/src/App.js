import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([ { name: 'Arto Hellas' } ])
  const [newName, setNewName] = useState('')
  

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
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
      setNewName('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <p key={person.name}>{person.name}</p>
        ))}
      </div>
    </>
  )
}

export default App
