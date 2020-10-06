import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({ search, handleSearch }) => (
  <div>Find countries: <input value={search} onChange={handleSearch} /></div>
)

const Countries = ({ countries, search, onClick }) => {

  const searchForCountries = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase())) 

  if (searchForCountries.length === 0) {
    return (
      <div>
        <p>No countries by that name!</p>
      </div>
    )
  } else if (searchForCountries.length === 1) {
    return (
      <Country country = {searchForCountries[0]} />
    )
  } else if (searchForCountries.length < 10) {
    return (
      <div>
        {searchForCountries.map(country => 
          <p key={country.name}>
            {country.name} <Button handleClick={() => onClick(country.name)} text='show' />
          </p>
        )}
  
      </div>
    )
  } else {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
}

const Country = ({ country }) => (
  <div>
    <h1>{country.name}</h1>
    <p>Capital {country.capital}</p>
    <p>Population {country.population}</p>
    <h2>Languages</h2>
    <ul>
      {country.languages.map(language => 
        <li key={language.name}>{language.name}</li>
      )}
    </ul>
    <img src={country.flag} alt='Country flag' width='10%'></img>
  </div>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

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

