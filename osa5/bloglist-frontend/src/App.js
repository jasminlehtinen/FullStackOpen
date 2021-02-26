import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll().then(initislBlogs =>
        setBlogs(initislBlogs)
    )  
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

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
            <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
          Password
            <input
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={addBlog}>

        <div>
          Title:
          <input 
            value={newTitle}
            onChange={handleNewTitle}
          />
        </div>
        <div>
          Author:
          <input 
            value={newAuthor}
            onChange={handleNewAuthor}
          />
        </div>
        <div>
          Url:
          <input 
            value={newUrl}
            onChange={handleNewUrl}
          />
        </div>
        <div>
          Likes:
          <input 
            value={newLikes}
            onChange={handleNewLikes}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )

  //<Notification message={errorMessage} />
  

  return (
    <div>
      <h1>Blogs</h1>

    

      {user === null ? 
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          {blogForm()}
        </div>
      }

      <ul>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </ul>
    </div>
  )
}

export default App