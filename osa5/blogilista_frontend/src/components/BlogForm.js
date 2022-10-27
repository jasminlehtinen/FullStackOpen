const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  newTitle,
  newAuthor,
  newUrl, 
  message
}) => {
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title: 
            <input 
              type="text"
              value={newTitle}
              name="Title"
              onChange={handleTitleChange}
            />
        </div>
        <div>
          Author: 
            <input 
              type="text"
              value={newAuthor}
              name="Author"
              onChange={handleAuthorChange}
            />
        </div>
        <div>
          Url: 
            <input 
              type="text"
              value={newUrl}
              name="Author"
              onChange={handleUrlChange}
            />
        </div>
        <button type="submit">Create</button>
        <div>{message}</div>
      </form>
    </div>
  )
}

export default BlogForm