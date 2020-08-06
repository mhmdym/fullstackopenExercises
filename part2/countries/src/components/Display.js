import React from 'react'
import Country from './Country'

const Display = ({ countries, keyword }) => {
  if (!keyword) {
    return  (
      <div>
        <p>no keyword specified</p>        
      </div>
    )
  }
  
  const dataToShow = countries.filter(c => 
    c.name.toLowerCase().includes(keyword.toLowerCase())
  )
  let resultLength = dataToShow.length
  if (resultLength > 10) {
    return <div><p>too many matches, specify another filter</p></div>
  } else if (resultLength > 0) {
    return (
      <div>
        {dataToShow.map(c =>
          <Country key={c.name} country={c} />
        )}
      </div>
    )
  } else {
    return <div><p>nothing found, specify another filter</p></div>
  }
}

export default Display
