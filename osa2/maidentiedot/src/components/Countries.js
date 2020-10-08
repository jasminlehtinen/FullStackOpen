import React from 'react'
import Country from './Country'
import Button from './Button'

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
    } else if (searchForCountries.length < 10 ) {
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

export default Countries