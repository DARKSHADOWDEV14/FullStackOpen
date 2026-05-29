import { useState, useEffect } from "react";
import BlogForm from "./components/formBlogs";
import blogsServices from "./services/blogs";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newLikes, setNewLikes] = useState(0);
  const [allClicks, setAll] = useState([]);
  // const [message, setMessage] = useState(null);

  useEffect(() => {
    blogsServices.getAll().then((response) => {
      setBlogs(response.data);
    });
  }, []);

  const addNewBlog = (event) => {
    event.preventDefault();

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
    };

    blogsServices.create(newBlog).then((response) => {
      setBlogs(blogs.concat(response.data));

      // setMessage({
      //   message: `Added ${response.data.name}`,
      //   type: "success",
      // });

      // setTimeout(() => {
      //   setMessage(null);
      // }, 5000);

      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
      setNewLikes(0);
    });
  };

  const handleTitleChange = (event) => {
    event.preventDefault();
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    event.preventDefault();
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    event.preventDefault();
    setNewUrl(event.target.value);
  };

  const handleLikesChange = () => {
    setNewLikes(newLikes + 1);
    setAll([...allClicks, "Like"]);
    console.log(newLikes);
  };

  return (
    <>
      <h1>Blogs</h1>

      <BlogForm
        addNewBlog={addNewBlog}
        newTitle={newTitle}
        handleTitleChange={handleTitleChange}
        newAuthor={newAuthor}
        handleAuthorChange={handleAuthorChange}
        newUrl={newUrl}
        handleUrlChange={handleUrlChange}
        newLikes={newLikes}
        handleLikesChange={handleLikesChange}
      />
    </>
  );
}

export default App;
