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

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain(
    'hmm'
  )
})

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

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(blog.body.likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})
