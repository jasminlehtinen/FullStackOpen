import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
    const [weather, setWeather] = useState([])
  
    const api_key = process.env.REACT_APP_API_KEY
    const capital = country.capital
  
    useEffect(() => {
      axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
        .then(response => {
          setWeather(response.data)
        })
    }, [api_key, capital])
  
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <div>{weather.weather ? <div><p>{weather.weather[0].main}, {weather.weather[0].description}</p></div> : null }</div>
        <div>
          <p>Temperature: {weather.main ? weather.main.temp : "Loading.." } °C</p>
          <p>Feels like: {weather.main ? weather.main.feels_like : "Loading.." } °C</p>
          <p>Wind: {weather.wind ? weather.wind.speed : "Loading.."} km/h</p>
        </div>
  
      </div>
    )
}

export default Weather