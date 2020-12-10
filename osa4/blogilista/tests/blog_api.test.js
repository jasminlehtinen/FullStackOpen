const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

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

// Exercise 4.9*
test('Returned blogs have a correct id', async () => {
  const response = await api.get('/api/blogs')

  const body = response.body[0]

  expect(body.id).toBeDefined()
  
})

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
test('A blog without title and url cannot be added', async () => {
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

afterAll(() => {
  mongoose.connection.close()
})
