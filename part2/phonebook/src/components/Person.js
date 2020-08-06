import React from 'react'

const Person = ({ person, deleteRecord }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={deleteRecord}>
        delete
      </button>
    </li>
  )
}

export default Person
