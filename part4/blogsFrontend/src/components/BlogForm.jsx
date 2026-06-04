

const BlogForm = ({
  newTitle,
  handleTitleChange,
  addNewBlog,
  newAuthor,
  handleAuthorChange,
  newUrl,
  handleUrlChange,
}) => {

  return (
    <>
      <h2>Add New Blog</h2>
      <form onSubmit={addNewBlog}>
        <div>
          title: <input value={newTitle} onChange={handleTitleChange} />
        </div>
        <div>
          author: <input value={newAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          url: <input value={newUrl} onChange={handleUrlChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>

    </>
  )
}



export default BlogForm
// , handleNameChange, newAuthor, handleAuthorChange, newUrl, handleUrlChange, newLikes, handleLikesChange, addNewBlog
