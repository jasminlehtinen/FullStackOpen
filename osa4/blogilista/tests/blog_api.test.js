const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: 'Advanced Mathematics',
    author: 'Ada Lovelace',
    url: 'http://www.blogs.com/programming101/ada-lovelace/advanced_mathematics',
    likes: 12,
  },
  {
    title: 'Learning Full-stack',
    author: 'Jasmin Lehtinen',
    url: 'http://www.blogs.com/programming101/jasmin-lehtinen/learning_full-stack',
    likes: 3,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Correct amount of blogs returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('Returned blogs have a correct id', async () => {
  const response = await api.get('/api/blogs')

  const body = response.body[0]

  expect(body.id).toBeDefined()
  
})

afterAll(() => {
  mongoose.connection.close()
})
