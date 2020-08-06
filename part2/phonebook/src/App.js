import React, { useState, useEffect } from 'react'
import './index.css'
import personService from './services/persons'
import Header from './components/Header'
import FilterForm from './components/FilterForm'
import NewRecordForm from './components/NewRecordForm'
import Display from './components/Display'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ keyword , setKeyword ] = useState('')
  const [ message, setMessage ] = useState({type: null, content: null })

  useEffect(() => {
    personService
      .getAll()
      .then(returnedData => {
        setPersons(returnedData)
      })
  }, [])

  const updateName = event => setNewName(event.target.value)
  const updateNumber = event => setNewNumber(event.target.value)
  const updateKeyword = event => setKeyword(event.target.value)
  
  const deleteRecordAt = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`delete ${person.name}`)) {
      personService
      .remove(id)
      .then(returnedData => {
        // console.log(returnedData)
        setPersons(persons.filter(p => p.id !== id))
        setMessage(
          {type: 'success', content: `deleted ${person.name}`}
        )
        setTimeout(() => {
          setMessage({type: null, content: null})
        }, 3000);
      })
    }
  }

  const addRecord = event => {
    event.preventDefault()
    // validate user input
    const isMissingField = !newName || !newNumber
    const isDuplicateName = persons
      .map(p => p.name.toLowerCase())
      .includes(newName.toLowerCase())

    if (isMissingField) {
      window.alert('one or more fields missing')
    } else if (isDuplicateName) {
      let cnfrmRslt = window.confirm(
        `${newName} already exists.\n` + 
        'replace the old number with the new one?'
      )
      if (cnfrmRslt) {
        const oldData = persons.find(
          p => p.name.toLowerCase().includes(newName.toLowerCase())
        )
        const newData = {...oldData, number: newNumber}
        personService
          .update(oldData.id, newData)
          .then(returnedObj => {
            setPersons(persons.map(p =>
              p.id === oldData.id? returnedObj : p
            ))
            setNewName('')
            setNewNumber('')
            setMessage(
              {type: 'success', content: `changed ${returnedObj.name}'s number`}
            )
            setTimeout(() => {
              setMessage({type: null, content: null})
            }, 3000);
          })
          .catch(error => {
            setMessage(
              {type: 'error', content: `information for ${newData.name} has been deleted from server`}
            )
            setTimeout(() => {
              setMessage({type: null, content: null})
            }, 5000);
          })
      } else {return}
    } else {
      // send to server
      personService
      .create({name: newName, number: newNumber})
      .then(returnedObj => {
        setPersons(persons.concat(returnedObj))
        setNewName('')
        setNewNumber('')
        setMessage(
          {type: 'success', content: `added ${returnedObj.name}`}
        )
        setTimeout(() => {
          setMessage({type: null, content: null})
        }, 3000);
      })
    }
  }

  
  return (
    <div>
      <Header />
      <Notification message={message} />
      <FilterForm
        keyword={keyword} updateKeyword={updateKeyword}
      />
      <NewRecordForm
        newName={newName} updateName={updateName}
        newNumber={newNumber} updateNumber={updateNumber}
        addRecord={addRecord}
      />
      <Display
        persons={persons} keyword={keyword}
        deleteRecordAt={deleteRecordAt}
      />
    </div>
  )
}

export default App
