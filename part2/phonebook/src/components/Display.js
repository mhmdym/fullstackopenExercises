import React from 'react'
import Person from './Person'

const Display = ({ persons, keyword, deleteRecordAt }) => {
  const dataToShow = keyword
    ? persons.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Records</h2>
      <ul>
        {dataToShow.map(person =>
          <Person key={person.id}
            person={person} 
            deleteRecord={() => deleteRecordAt(person.id)}  
          />
        )}
      </ul>
    </div>
  )
}

export default Display
