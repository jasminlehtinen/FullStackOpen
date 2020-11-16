import React from 'react'

const BlogForm = ({ addBlog, newTitle, handleNewTitle, newAuthor, handleNewAuthor, newUrl, handleNewUrl, newLikes, handleNewLikes }) => {
  return (
    <form onSubmit={addBlog} className="App-form">
      <div>Title: <input value={newTitle} onChange={handleNewTitle} /></div>
      <div>Author: <input value={newAuthor} onChange={handleNewAuthor} /></div>
      <div>Url: <input value={newUrl} onChange={handleNewUrl} /></div>
      <div>Likes: <input value={newLikes} onChange={handleNewLikes} /></div>
      <div><button type="submit">Add</button></div>
    </form>
  )
}

export default BlogForm
