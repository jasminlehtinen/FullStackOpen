import React from 'react'

const Filter = ({ search, handleSearch }) => (
    <>Find countries: <input value={search} onChange={handleSearch} /></>
)

export default Filter