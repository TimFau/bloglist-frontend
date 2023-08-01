const Blog = ({blog}) => (
  <div className="blog-item">
    <span>Title: {blog.title}</span>
    <span>Author: {blog.author}</span>
  </div>  
)

export default Blog