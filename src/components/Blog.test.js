import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

// Test Data
const blog = {
  author: 'Test Author',
  id: '123456789',
  likes: 7,
  title: 'Test Blog Post',
  url: 'https://google.com',
  user: {
    id: '1234',
    name: 'Test User',
    username: 'raged'
  }
}

// Tests
test('renders only title and author by default', () => {

  const { container } = render(
    <Blog
      blog={blog}
      usersUsername='Test User'
      handleDeleteBlog={() => {}}
      handleIncrementLikes={() => {}}
    />
  )


  expect(container).toBeDefined()

  expect(container).toHaveTextContent(blog.author)
  expect(container).toHaveTextContent(blog.title)
  expect(container).not.toHaveTextContent(blog.url)
  expect(container).not.toHaveTextContent(blog.likes)
})

test('renders url and likes after clicking "view more"', async () => {

  const { container } = render(
    <Blog
      blog={blog}
      usersUsername='Test User'
      handleDeleteBlog={() => {}}
      handleIncrementLikes={() => {}}
    />
  )
  const user = userEvent.setup()
  const button = screen.getByRole('button')


  expect(container).toBeDefined()

  await user.click(button)

  expect(container).toHaveTextContent(blog.author)
  expect(container).toHaveTextContent(blog.title)
  expect(container).toHaveTextContent(blog.url)
  expect(container).toHaveTextContent(blog.likes)
})