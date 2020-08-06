import React, { useState, useEffect } from 'react'

const CountryHeader = ({ country, showInfo, toggleShowInfo }) => {
  return (
    <div>
      {country.name}
      <button onClick={toggleShowInfo}>
        {showInfo ? 'hide' : 'show'}
      </button>
    </div>
  )
}

const CountryInfo = ({ country, weather }) => {
  return (
    <div>
      <h3>{country.name}</h3>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h4>languages</h4>
      <ul>
        {country.languages.map(lng => 
          <li key={lng.name}>{lng.name}</li>
        )}
      </ul>
      <img
        src={country.flag}
        alt={`${country.name}'s flag`}
        width="150"
      />
      <h4>weather in {country.capital}</h4>
      <p>temperature: {weather.current ? weather.current.temperature : 'n/a'}</p>
      <img 
        src={weather.current ? weather.current.weather_icons[0] : ''}
        alt="weather icon"
      />
      <p>wind: {weather.current ? weather.current.wind_speed : 'n/a'}</p>
    </div>
  )
}

const Country = ({ country }) => {
  const [ showInfo, setShowInfo ] = useState(false)
  const [ weather, setWeather ] = useState({})

  useEffect(() => {
    let mounted = true
    const ENDPOINT = 'http://api.weatherstack.com/current'
    const KEY = process.env.REACT_APP_API_KEY
    const api_url = `${ENDPOINT}?access_key=${KEY}&query=${country.capital}`
    fetch(api_url)
      .then(response => response.json())
      .then(data => {
        if (mounted) setWeather(data)
      })
      .catch(error => console.error(error))
    return () => {mounted = false}  // clean up
  }, [country.capital])

  const toggleShowInfo = event => setShowInfo(!showInfo)
  
  return showInfo
    ?
      <div>
        <CountryHeader country={country} showInfo={showInfo} toggleShowInfo={toggleShowInfo} />
        <CountryInfo country={country} weather={weather} />
      </div>
    :
      <div>
        <CountryHeader country={country} showInfo={showInfo} toggleShowInfo={toggleShowInfo} />
      </div>
}

export default Country