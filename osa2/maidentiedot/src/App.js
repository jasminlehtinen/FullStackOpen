import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  })

  const handleSearch = (event) => {
    event.preventDefault()
    setSearch(event.target.value)
  }

  return (
    <>
      <Filter search={search} handleSearch={handleSearch} />
      <Countries countries={countries} search={search} onClick={setSearch} />
    </>
  )
}

export default App

