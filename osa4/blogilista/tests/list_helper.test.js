const dummy = require('../utils/list_helper').dummy
const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog

test('Dummy returns one', () => {
  const blogs = []

  const result = dummy(blogs)
  expect(result).toBe(1)
})

describe('Total likes', () => {

  const listWithNoBlogs = []

  const listWithOneBlog = [
    {
      _id: '5fb024cde5de4c0ad0e14828',
      title: 'Advanced Mathematics',
      author: 'Ada Lovelace',
      url: 'http://www.blogs.com/ada-lovelace/advanced_mathematics',
      likes: 5,
      __v: 0
    }
  ]

  const listWithManyBlogs = [
    {
      _id: '5fb024cde5de4c0ad0e14828',
      title: 'Advanced Mathematics',
      author: 'Ada Lovelace',
      url: 'http://www.blogs.com/ada-lovelace/advanced_mathematics',
      likes: 5,
      __v: 0
    },
    {
      _id: '5fb026a2e5de4c0ad0e14829',
      title: 'Architecture',
      author: 'Kristen McIntyre',
      url: 'http://www.blogs.com/coding101/kristen-mcintyre/architecture',
      likes: 10,
      __v: 0
    },
    {
      _id: '5fb2cb7bd9398c427c719577',
      title: 'About Apollo 11',
      author: 'Margaret Hamilton',
      url: 'http://www.blogs.com/margaret-hamilton/about_apollo_11',
      likes: 7,
      __v: 0
    } 
  ]

  test('When the list is empty, equal to 0', () => {
    const result = totalLikes(listWithNoBlogs)
    expect(result).toBe(0)
  })

  test('When the list has only one blog, all the likes of that blog', () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('When the list has many blogs, sum of all the likes of the blogs', () => {
    const result = totalLikes(listWithManyBlogs)
    expect(result).toBe(22)
  })
})

describe('Favorite blog', () => {

  const listWithNoBlogs = []

  const listWithManyBlogs = [
    {
      _id: '5fb024cde5de4c0ad0e14828',
      title: 'Advanced Mathematics',
      author: 'Ada Lovelace',
      url: 'http://www.blogs.com/ada-lovelace/advanced_mathematics',
      likes: 5,
      __v: 0
    },
    {
      _id: '5fb026a2e5de4c0ad0e14829',
      title: 'Architecture',
      author: 'Kristen McIntyre',
      url: 'http://www.blogs.com/coding101/kristen-mcintyre/architecture',
      likes: 10,
      __v: 0
    },
    {
      _id: '5fb2cb7bd9398c427c719577',
      title: 'About Apollo 11',
      author: 'Margaret Hamilton',
      url: 'http://www.blogs.com/margaret-hamilton/about_apollo_11',
      likes: 7,
      __v: 0
    } 
  ]

  test('When the list is empty, return 0', () => {
    const result = favoriteBlog(listWithNoBlogs)
    expect(result).toBe(0)
  })

  test('Favorite blog by likes', () => {
    const result = favoriteBlog(listWithManyBlogs)
    expect(result).toEqual({
      title: 'Architecture',
      author: 'Kristen McIntyre',
      likes: 10
    })
  })
})
