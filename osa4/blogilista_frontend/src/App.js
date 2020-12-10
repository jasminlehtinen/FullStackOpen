import React, { useState, useEffect } from 'react'
import './App.css'
import blogService from './services/blogs'
import Header from './components/Header'
import Subheader from './components/Subheader'
import Filter from './components/Filter'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'


const App = () => {
  const header = 'List of Blogs'
  const firstSubheader = 'Add a new blog'
  const secondSubheader = 'Blogs'

  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')
  const [searchByTitle, setSearchByTitle] = useState('')
  const [searchByAuthor, setSearchByAuthor] = useState('')

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
    }

    const isDuplicate = blogs.find(blog => blog.title === newTitle)

    if (isDuplicate) {
      if (window.confirm(`${newTitle} is already added to the blog list, want to update the blog information?`)) {
        updateBlog(isDuplicate, isDuplicate.id, newUrl, newLikes)
      }
    } else {
      blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setNewLikes('')
      })
      .catch(error => {
        const validationError = Object.values(error.response.data)
        console.log(validationError)
      })
    }
  }

  const removeBlog = id => {
    blogService
      .remove(id)
      .then(res => {
        setBlogs(blogs.filter(blog => blog.id !== id))
      })
  }

  const updateBlog = (duplicate, id, updatedUrl, updatedLikes) => {
    const changedBlog = { ...duplicate, url: updatedUrl, likes: updatedLikes}

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
  }

  const handleNewTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleNewAuthor = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleNewUrl = (event) => {
    setNewUrl(event.target.value)
  }

  const handleNewLikes = (event) => {
    setNewLikes(event.target.value)
  }

  const handleSearchTitle = (event) => {
    setSearchByTitle(event.target.value)
  }

  const handleSearchAuthor = (event) => {
    setSearchByAuthor(event.target.value)
  }

  const searchBlogList = blogs.filter(blog => blog.title.toLowerCase().includes(searchByTitle.toLowerCase()))

  return (
    <>
      <Header text={header} />
      <div className="App">
        <Filter searchByTitle={searchByTitle} handleSearchTitle={handleSearchTitle} searchByAuthor={searchByAuthor} handleSearchAuthor={handleSearchAuthor} />
        <Subheader text={firstSubheader} />
        <BlogForm addBlog={addBlog} newTitle={newTitle} handleNewTitle={handleNewTitle} newAuthor={newAuthor} handleNewAuthor={handleNewAuthor} newUrl={newUrl} handleNewUrl={handleNewUrl} newLikes={newLikes} handleNewLikes={handleNewLikes} />
        <Subheader text={secondSubheader} />
        <BlogList searchBlogList={searchBlogList} removeBlog={removeBlog} />
      </div>
    </>
  )
}

export default App
