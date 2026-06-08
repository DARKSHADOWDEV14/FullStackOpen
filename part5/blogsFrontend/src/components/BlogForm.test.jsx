import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import BlogForm from './BlogForm';
import Button from './Button';
import Blog from './Blog';

test('renders title and author by default', () => {
  const blog = {
    title: 'Testing React Apps',
    author: 'Andrew',
    url: 'http://testing.com',
    likes: 10,
  };

  const { container } = render(<Blog blog={blog} />);

  expect(container).toHaveTextContent('Testing React Apps');
  expect(container).toHaveTextContent('Andrew');

  const hiddenDiv = container.querySelector(
    'div[style="display: none;"]'
  );

  expect(hiddenDiv).toHaveTextContent('http://testing.com');
  expect(hiddenDiv).toHaveTextContent('Likes:');
});

test('shows url and likes when view button is clicked', async () => {
  const blog = {
    title: 'Testing React Apps',
    author: 'Andrew',
    url: 'http://testing.com',
    likes: 10,
  };

  render(
    <Blog
      blog={blog}
      updateLikes={() => {}}
      removeBlog={() => {}}
    />
  );

  const user = userEvent.setup();

  const button = screen.getByText('view');
  await user.click(button);

  expect(
    screen.getByText('http://testing.com')
  ).toBeInTheDocument();

  expect(
    screen.getByText(/Likes:\s*10/i)
  ).toBeInTheDocument();
});

test('login button calls event handler once when clicked', async () => {
  const mockHandler = vi.fn();

  render(
    <Button
      onClick={mockHandler}
      text='Login'
    />
  );

  const button = screen.getByText('Login');

  await userEvent.click(button);

  expect(mockHandler).toHaveBeenCalledTimes(1);
});

test('clicking like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Testing React Apps',
    author: 'Andrew',
    url: 'http://testing.com',
    likes: 10,
  };

  const mockHandler = vi.fn();

  render(
    <Blog
      blog={blog}
      updateLikes={mockHandler}
      removeBlog={() => {}}
    />
  );

  const user = userEvent.setup();

  const viewButton = screen.getByText('view');
  await user.click(viewButton);

  const likeButton = screen.getByText('Like');

  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler).toHaveBeenCalledTimes(2);
});

test('calls the event handler with correct details when a new blog is created', async () => {
  const createBlog = vi.fn();

  const user = userEvent.setup();

  render(
    <BlogForm
      addNewBlog={createBlog}
      newTitle=""
      newAuthor=""
      newUrl=""
      handleTitleChange={() => {}}
      handleAuthorChange={() => {}}
      handleUrlChange={() => {}}
    />
  );

  const inputs = screen.getAllByRole('textbox');

  await user.type(inputs[0], 'Testing React Apps');
  await user.type(inputs[1], 'Andrew');
  await user.type(inputs[2], 'http://testing.com');

  const submitButton = screen.getByText('Add');

  await user.click(submitButton);

  expect(createBlog).toHaveBeenCalledTimes(1);
});

test('calls event handler with correct details when a new blog is created', async () => {
  const createBlog = vi.fn();

  render(
    <BlogForm
      addNewBlog={createBlog}
      newTitle=''
      newAuthor=''
      newUrl=''
      handleTitleChange={() => {}}
      handleAuthorChange={() => {}}
      handleUrlChange={() => {}}
      handleLikesChange={() => {}}
    />
  );

  const inputs = screen.getAllByRole('textbox');

  await userEvent.type(inputs[0], 'Cien años de soledad');
  await userEvent.type(inputs[1], 'Gabriel García Márquez');
  await userEvent.type(inputs[2], 'gabo@gmail.com');

  const button = screen.getByText('Add');

  await userEvent.click(button);

  expect(createBlog).toHaveBeenCalledTimes(1);
});

