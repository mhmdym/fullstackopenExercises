import React from 'react'

const FilterForm = (props) => {
  return (
    <div>
      <h2>Search for record</h2>
      <input placeholder="type name to search for"
        value={props.keyword} onChange={props.updateKeyword}
      />
    </div>
  )
}

export default FilterForm
