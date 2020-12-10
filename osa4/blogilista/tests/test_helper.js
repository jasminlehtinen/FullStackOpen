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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}