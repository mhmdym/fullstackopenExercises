import React from 'react'

const NewRecordForm = (props) => {
  return (
    <div>
      <h2>Add new record</h2>
      <form onSubmit={props.addRecord}>
        <input placeholder="type new name"
          value={props.newName} onChange={props.updateName}
        /><br />
        <input placeholder="type new phone number"
          value={props.newNumber} onChange={props.updateNumber}
        /><br />
        <input type="submit" value="Save" />
      </form>
    </div>
  )
}

export default NewRecordForm
