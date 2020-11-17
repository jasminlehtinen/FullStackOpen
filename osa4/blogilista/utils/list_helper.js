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
    let max = blogs[0]

    blogs.forEach(blog => {
      if (blog.likes > max.likes) {
        max = blog
      }
    })
    return {
      title: max.title,
      author: max.author,
      likes: max.likes
    }
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}
