import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import BlogForm from './BlogForm'
import Button from './Button'
import Blog from './Blog'

test('clicking like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    url: 'gabo@gmail.com',
    likes: 10
  }

  const mockHandler = vi.fn()

  render(
    <Blog
      blog={blog}
      updateLikes={mockHandler}
      removeBlog={() => {}}
    />
  )

  const user = userEvent.setup()

  await user.click(screen.getByText('view'))

  const likeButton = screen.getByText('like')

  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})

test('login button calls event handler once when clicked', async () => {
  const mockHandler = vi.fn()

  render(
    <Button
      onClick={mockHandler}
      text='Login'
    />
  )

  const button = screen.getByText('Login')

  await userEvent.click(button)

  expect(mockHandler).toHaveBeenCalledTimes(1)
})

test('calls event handler with correct details when a new blog is created', async () => {
  const createBlog = vi.fn()

  render(
    <BlogForm
      addNewBlog={createBlog}
      newTitle=''
      newAuthor=''
      newUrl=''
      handleTitleChange={() => {}}
      handleAuthorChange={() => {}}
      handleUrlChange={() => {}}
      newLikes={0}
      handleLikesChange={() => {}}
    />
  )

  const inputs = screen.getAllByRole('textbox')

  await userEvent.type(inputs[0], 'Cien años de soledad')
  await userEvent.type(inputs[1], 'Gabriel García Márquez')
  await userEvent.type(inputs[2], 'gabo@gmail.com')

  const button = screen.getByText('Add')

  await userEvent.click(button)

  expect(createBlog).toHaveBeenCalledTimes(1)
})

