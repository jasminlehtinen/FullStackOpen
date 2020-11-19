const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, current) => {
    return sum + current.likes
  }

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else {
    const reducer = (max, current) => {
      return current.likes > max.likes ? current : max
    }

    const maxLikes = blogs.reduce(reducer)

    return {
      title: maxLikes.title,
      author: maxLikes.author,
      likes: maxLikes.likes
    }
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else {
    const result = _(blogs)
      .groupBy('author')
      .map((value, key) => ({
        'author': key,
        'title': _.map(value, 'title')
      }))
      .value()

    const reducer = (max, current) => {
      return current.title > max.title ? current : max
    }

    const maxBlogs = result.reduce(reducer)

    return {
      author: maxBlogs.author,
      blogs: maxBlogs.title.length
    }
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}
