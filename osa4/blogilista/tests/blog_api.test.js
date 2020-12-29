const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

describe('When there are some blogs already saved', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  // Exercise 4.8
  test('Blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  // Exercise 4.8
  test('Correct amount of blogs returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  describe('Viewing a specific blog', () => {

    // Exercise 4.9*
    test('Returned blogs have a correct id', async () => {
      const response = await api.get('/api/blogs')

      const body = response.body[0]

      expect(body.id).toBeDefined()
    })
  })

  describe('Adding a new blog', () => {

    // Exercise 4.10
    test('A valid blog can be added', async () => {
      const newBlog = {
        title: 'hmm',
        author: 'nobody',
        url: 'http://www.blogs.com/hmm',
        likes: 1
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)


      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(b => b.title)
      expect(titles).toContain(
        'hmm'
      )
    })

    // Exercise 4.11*
    test('A blog without likes automatically gets 0 likes', async () => {
      const newBlog = {
        title: 'no likes',
        author: 'nobody',
        url: 'http://www.blogs.com/no_likes',
      }

      const blog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
      expect(blog.body.likes).toBe(0)
    })

    // Exercise 4.12*
    test('A blog without title or url cannot be added', async () => {
      /*const blogWithoutTitle = {
    author: 'nobody',
    url: 'http://www.blogs.com/no-title',
    likes: 1
  }*/

      /*const blogWithoutUrl = {
    title: 'this blog has no url',
    author: 'nobody',
    likes: 1
  }*/

      const blogWithoutBoth = {
        author: 'nobody',
        likes: 1
      }

      await api
        .post('/api/blogs')
        .send(blogWithoutBoth)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
  })

  describe('Deleting a blog', () => {

    // Exercise 4.13
    test('A blog is successfully deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(b => b.title)
      expect(titles).not.toContain(blogToDelete.title)
    })
  })

  describe('Editing an existing blog', () => {

    // Exercise 4.14*
    test('Successfully change a blog`s information', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]


      const updatedValues = {
        url: 'http://www.blogs.com/hmm',
        likes: 5,
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedValues)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd[0].likes).toEqual(updatedValues.likes)
      expect(blogsAtEnd[0].url).toContain('hmm')
    })
  })

  // USERS
  describe('When there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('User creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'jazz',
        name: 'Jasmin Lehtinen',
        password: 'kissa',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('Cannot create a new user with an already existing username ', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      expect(result.body.error).toContain('`username` to be unique')
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
