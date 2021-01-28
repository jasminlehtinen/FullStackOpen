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

    await User.deleteMany({})
  
    const passwordHash = await bcrypt.hash('mauku', 10)
    const user = new User({ username: 'miuku', passwordHash })

    await user.save()
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

  describe('Adding a new blog when there is at least one user', () => {

    // Exercise 4.10 (and 4.22*)
    test('A valid blog by an user can be added', async () => {

      const users = await api.get('/api/users')
      const userId = users.body[0].id
  
      const login = await api.post('/api/login')
        .send({
          'username': 'miuku',
          'password': 'mauku'
        })

      const token = login.body.token

      const newBlog = {
        title: '10 Best Cat Treats',
        author: 'Catto',
        url: 'http://www.blogs.com/10_best_cat_treats',
        likes: 1,
        user: {
          username: 'miuku',
          id: userId
        }
      }

      await api 
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(b => b.title)
      expect(titles).toContain(
        '10 Best Cat Treats'
      )
    })

    // Exercise 4.11* (and 4.22*)
    test('A blog without likes automatically gets 0 likes', async () => {

      const users = await api.get('/api/users')
      const userId = users.body[0].id
  
      const login = await api.post('/api/login')
        .send({
          'username': 'miuku',
          'password': 'mauku'
        })

      const token = login.body.token

      const newBlog = {
        title: 'Best Cat Beds And Why It`s Always The Cardboard Box',
        author: 'Catto',
        url: 'http://www.blogs.com/best_cat_beds',
        user: {
          username: 'miuku',
          id: userId
        }
      }

      const blog = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
      expect(blog.body.likes).toBe(0)
    })

    // Exercise 4.12* (and 4.22*)
    test('A blog without title or url cannot be added', async () => {

      const users = await api.get('/api/users')
      const userId = users.body[0].id
  
      const login = await api.post('/api/login')
        .send({
          'username': 'miuku',
          'password': 'mauku'
        })

      const token = login.body.token

      /*const blogWithoutTitle = {
        author: 'Catto',
        url: 'http://www.blogs.com/cat_life',
        likes: 1
      }*/

      /*const blogWithoutUrl = {
        title: 'Catto's Choice',
        author: 'Catto',
        likes: 1
      }*/

      const blogWithoutBoth = {
        author: 'Catto',
        likes: 1,
        user: {
          username: 'miuku',
          id: userId
        }
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blogWithoutBoth)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    // Exercise 4.22*
    test('A blog without a token cannot be added', async () => {
      const users = await api.get('/api/users')
      const userId = users.body[0].id

      const newBlog = {
        title: 'Running Around 4am',
        author: 'Catto',
        url: 'http://www.blogs.com/running_around',
        user: {
          username: 'miuku',
          id: userId
        }
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect('Content-Type', /application\/json/)
        .expect(401)
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
  
    test('User creation succeeds with a new username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'jazz',
        name: 'Jasmin Lehtinen',
        password: 'JALE',
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

    test('Cannot create a new user with an already existing username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'miuku',
        name: 'Katti Kissanen',
        password: 'mauku',
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

    test('Cannot create a new user with too short username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'DG',
        name: 'Dorian Gray',
        password: 'dgs',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      expect(result.body.error).toContain('Path `username` (`DG`) is shorter than the minimum allowed length (3)')
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('Cannot create a new user with too short password', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'dorian',
        name: 'Dorian Gray',
        password: 'dg',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      expect(result.body.error).toContain('Password must be at least 3 characters long')
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
