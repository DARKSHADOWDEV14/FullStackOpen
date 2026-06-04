import Togglable from './Togglable'

const Blog = ({ blog, updateLikes, removeBlog }) => {
  return (
    <ol>
      <h3> {blog.title} </h3>
      <p>Author: {blog.author}</p>

      <Togglable buttonLabel="view" text="hide">
        
        <p>{blog.url}</p>
        <p>Likes: {blog.likes}</p>

        <button onClick={() => updateLikes(blog, 1)}>
          Like
        </button>

        <button onClick={() => removeBlog(blog.id)}>
          Delete
        </button>
      </Togglable>
    </ol>
  )
}

export default Blog