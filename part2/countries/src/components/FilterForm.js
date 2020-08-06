import React from 'react'

const FilterForm = ({ keyword, updateKeyword }) => {
  return (
    <div>
      <input placeholder="type country name.."
        value={keyword} onChange={updateKeyword}
      />
    </div>
  )
}

export default FilterForm
