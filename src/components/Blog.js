import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({blog}) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const [currentBlog, setCurrentBlog] = useState(blog)

  const displayMoreInfo = {display: showMoreInfo ? 'block': 'none'}

  const handleIncrementLikes = async () => {
    const updatedBlog = await blogService.incrementLikes(currentBlog)
    setCurrentBlog(updatedBlog)
  }

  return (
    <div className="blog-item container">
      <div className="top-wrapper">
        <div className="blog-info">
          <span className="bold">{blog.title}</span>
          <span>{blog.author}</span>
        </div>
        <button onClick={() => setShowMoreInfo(!showMoreInfo)}>{showMoreInfo ? 'Hide' : 'View'}</button>
      </div>
      <div className="more-info" style={displayMoreInfo}>
        <a href={blog.url}>{blog.url}</a>
        <span>Likes: {currentBlog.likes} <button className="button-inline" onClick={handleIncrementLikes}>like</button></span>
        <span>{blog.user.username}</span>
      </div>
    </div>  
  )
}

export default Blog