import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
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

  screen.debug()
})