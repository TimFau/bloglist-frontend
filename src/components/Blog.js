import { useState } from "react"

const Blog = ({blog}) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false)

  const displayMoreInfo = {display: showMoreInfo ? 'block': 'none'}

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
        <span>Likes: {blog.likes}</span>
        <span>{blog.user.username}</span>
      </div>
    </div>  
  )
}

export default Blog