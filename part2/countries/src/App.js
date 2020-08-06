import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import FilterForm from './components/FilterForm'
import Display from './components/Display'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ keyword, setKeyword ] = useState('')

  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data => {setCountries(data)})
  }, [])

  const updateKeyword = event => setKeyword(event.target.value)

  return (
    <div>
      <Header />
      <FilterForm
        keyword={keyword} updateKeyword={updateKeyword}
      />
      <Display countries={countries} keyword={keyword} />
    </div>
  )
}

export default App
