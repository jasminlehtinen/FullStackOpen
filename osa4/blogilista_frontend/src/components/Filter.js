import React from 'react'

const Filter = ({ searchByTitle, searchByAuthor, handleSearchTitle, handleSearchAuthor }) => {
    return (
      <>
        <div className="App-filter">
          <div>Filter by Title: <input value={searchByTitle} onChange={handleSearchTitle} /></div>
          <div>Filter by Author: <input value={searchByAuthor} onChange={handleSearchAuthor} /></div>
        </div>
      </>
    )
}

export default Filter
