import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, usersUsername, handleDeleteBlog, handleIncrementLikes }) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const [currentBlog, setCurrentBlog] = useState(blog)

  const displayMoreInfo = showMoreInfo ? true : false

  const incrementLikes = async () => {
    try {
      const updatedBlog = await handleIncrementLikes(currentBlog)
      setCurrentBlog(updatedBlog)
    } catch (exception) {
      console.loog(exception)
    }
  }

  const currentLikes = currentBlog && currentBlog.likes || blog.likes // fix for react-testing-library

  return (
    <div className="blog-item container">
      <div className="top-wrapper">
        <div className="blog-info">
          <span className="bold">{blog.title}</span>
          <span>{blog.author}</span>
        </div>
        <button onClick={() => setShowMoreInfo(!showMoreInfo)}>{showMoreInfo ? 'Hide' : 'View'}</button>
      </div>
      {displayMoreInfo &&
        <div className="more-info">
          <a href={blog.url}>{blog.url}</a>
          <span>Likes: {currentLikes} <button className="button-inline" title="Increment Likes" onClick={incrementLikes}>like</button></span>
          <span>{blog.user.username}</span>
          {blog.user.username === usersUsername &&
            <button onClick={() => handleDeleteBlog(blog)}>Delete</button>
          }
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  usersUsername: PropTypes.string.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
  handleIncrementLikes: PropTypes.func.isRequired
}

export default Blog