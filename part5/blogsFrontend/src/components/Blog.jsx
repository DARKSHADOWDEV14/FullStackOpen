import Togglable from "./Togglable";

const Blog = ({ blog, updateLikes, removeBlog, user }) => {
  return (
    <ol>
      <div className="blog">
        <h3> {blog.title} </h3>
        <p>Author: {blog.author}</p>

        <Togglable buttonLabel="view" text="hide">
          <p>Url: {blog.url}</p>
          <p>Likes: {blog.likes}</p>
          <button onClick={() => updateLikes(blog, 1)}> Like </button>
          {user && blog.user.id === user.id && (
            <button onClick={() => removeBlog(blog.id)}> Delete </button>
          )}
        </Togglable>
      </div>
    </ol>
  );
};

export default Blog;
