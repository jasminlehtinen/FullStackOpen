import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => (
    <div>
      <h1>{country.name}</h1>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map(language => 
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img src={country.flag} alt='Country flag' width='10%'></img>
      <Weather country={country} />
    </div>
)

export default Country