import React from 'react'

const BlogList = ({ searchBlogList, removeBlog }) => {
  return (
    <div className="App-text">
      {searchBlogList.map(blog =>
        <p key={blog.title}>
          Title: {blog.title}<br/>
          Author: {blog.author}<br/>
          <a href={blog.url} className="App-link">{blog.url}</a><br/>
          Likes: {blog.likes}<br/>
          <button onClick={() => {if(window.confirm(`Remove ${blog.title}?`)){removeBlog(blog.id)}}}>Delete</button></p>
      )}
    </div>
  )
}

export default BlogList
