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
        <input id="title" data-testid="title" value={newTitle} onChange={handleTitleChange} />

        <input id="author" data-testid="author" value={newAuthor} onChange={handleAuthorChange} />

        <input id="url" data-testid="url" value={newUrl} onChange={handleUrlChange} />

        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default BlogForm;
// , handleNameChange, newAuthor, handleAuthorChange, newUrl, handleUrlChange, newLikes, handleLikesChange, addNewBlog
