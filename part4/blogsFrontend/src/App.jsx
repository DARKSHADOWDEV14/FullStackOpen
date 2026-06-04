/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from "react";
import BlogForm from "./components/BlogForm";
import blogsServices from "./services/blogs";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import Button from "./components/Button";
import Togglable from "./components/Togglable";

//  const BlogImportant = ({ note, toggleImportance }) => {
//   const label = note.important
//     ? 'make not important' : 'make important'

//   return (
//     <li>
//       {note.content}
//       <button onClick={toggleImportance}>{label}</button>
//     </li>
//   )
// }

function App() {
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  // const [newLikes, setNewLikes] = useState(0)
  const [message, setMessage] = useState(null);
  const [filterTitle, setFilterTitle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogsServices.getAll().then((response) => {
      setBlogs(response.data);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogsServices.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogsServices.setToken(user.token);
      setUser(user);
      setMessage({
        message: `Welcome ${user.name}`,
        type: "success",
      });

      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage({
        message: "Invalid username or password",
        type: "error",
        exception: exception,
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");

    blogsServices.setToken(null);
    setUser(null);

    setMessage({
      message: "Logged out successfully",
      type: "success",
    });

    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const addNewBlog = async (event) => {
    event.preventDefault();

    const existingBlog = blogs.find(
      (blog) => blog.title.toLowerCase() === newTitle.toLowerCase(),
    );

    try {
      if (existingBlog) {
        const confirmUpdate = window.confirm(
          `${newTitle} is already added to phonebook, replace the old number with a new one?`,
        );

        if (!confirmUpdate) {
          return;
        }

        const changedBlog = {
          ...existingBlog,
          url: newUrl,
          author: newAuthor,
        };

        const updatedBlog = await blogsServices.update(
          existingBlog.id,
          changedBlog,
        );

        setBlogs(
          blogs.map((blog) =>
            blog.id !== existingBlog.id ? blog : updatedBlog,
          ),
        );

        setMessage({
          message: `Updated ${updatedBlog.title}`,
          type: "success",
        });
      } else {
        const newBlog = {
          title: newTitle,
          author: newAuthor,
          url: newUrl,
          likes: newLikes,
        };

        blogFormRef.current.toggleVisibility(); //useRef

        const createdBlog = await blogsServices.create(newBlog);

        console.log("CREADO:", createdBlog);

        setBlogs(blogs.concat(createdBlog));

        setMessage({
          message: `Added ${createdBlog.title} by ${createdBlog.author}`,
          type: "success",
        });
      }

      setTimeout(() => {
        setMessage(null);
      }, 5000);

      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
      setNewLikes(0);
    } catch (error) {
      console.error(error);

      setMessage({
        message: error.response?.data?.error || error.message,
        type: "error",
      });

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const removeBlog = async (id) => {
    const blog = blogs.find((p) => p.id === id);

    if (!window.confirm(`Delete ${blog.title}?`)) {
      return;
    }

    try {
      await blogsServices.remove(id);

      setBlogs(blogs.filter((blog) => blog.id !== id));

      setMessage({
        message: `Deleted ${blog.title}`,
        type: "success",
      });

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (e) {
      setMessage({
        message: `Information of ${blog.title} has already been removed from server`,
        type: "error",
        error: e,
      });

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const handleLikesChange = () => {
    setNewLikes(newLikes + 1);
  };

  const handleFilterChange = (event) => {
    setFilterTitle(event.target.value);
  };

  const updateLikes = async (blog, value) => {
  
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + value,
      };
    

      const returnedBlog = await blogsServices.update(blog.id, updatedBlog);
      console.log("RESPUESTA:", returnedBlog);

      setBlogs(blogs.map((b) => (b.id !== blog.id ? b : returnedBlog)));
    } catch (error) {
      console.error("Error updating likes:", error);

      setMessage({
        message: "Error updating likes",
        type: "error",
      });

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const blogsToShow = blogs.filter((blog, index) => {
    console.log(index, blog);

    return (
      blog &&
      blog.title &&
      blog.title.toLowerCase().includes(filterTitle.toLowerCase())
    );
  });

  return (
    <>
      <Notification message={message} />
      {user && (
        <p>
          {user.name} logged in{" "}
          <Button onClick={handleLogout} text="Logout" />{" "}
        </p>
      )}

      {!user ? (
        <>
          <Togglable buttonLabel="Login" ref={blogFormRef} text="Cancel">
            <LoginForm
              handleLogin={handleLogin}
              username={username}
              password={password}
              handleUsernameChange={handleUsernameChange}
              handlePasswordChange={handlePasswordChange}
            />
          </Togglable>
        </>
      ) : (
        <>
          <h1>Blogs</h1>

          <div>
            <h2>filter shown with:</h2>

            <Filter
              filterTitle={filterTitle}
              handleFilterChange={handleFilterChange}
            />
          </div>
          <Togglable buttonLabel="Add New Blog" ref={blogFormRef} text="Cancel">
            <h2>Add New Blog</h2>

            <BlogForm
              addNewBlog={addNewBlog}
              newTitle={newTitle}
              handleTitleChange={handleTitleChange}
              newAuthor={newAuthor}
              handleAuthorChange={handleAuthorChange}
              newUrl={newUrl}
              handleUrlChange={handleUrlChange}
            />
          </Togglable>

          <h2>Blogs Filter</h2>
          {blogsToShow.map((blog) => (
            <ul key={blog.id}>
              <h3>Title: {blog.title}</h3>
              <Togglable buttonLabel="view" text="hide">
                <p>Author: {blog.author}</p>
                <p>URL: {blog.url}</p>
                <p>Likes: {blog.likes}</p>
                <button onClick={() => updateLikes(blog, 1)}>Like</button>
                <button onClick={() => removeBlog(blog.id)}>delete</button>
              </Togglable>
            </ul>
          ))}
        </>
      )}
    </>
  );
}

export default App;
