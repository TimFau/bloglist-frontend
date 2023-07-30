import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './css/main.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessages, setErrorMessages] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [createdTitle, setCreatedTitle] = useState('')
  const [createdAuthor, setCreatedAuthor] = useState('')
  const [createdUrl, setCreatedUrl] = useState('')

  useEffect(() => {
    let lsUser = localStorage.getItem('user')
    if (user) {
      getBlogs()
    }
    if(lsUser && !user) {
      const user = JSON.parse(lsUser)
      setUser(user)
    }
  }, [user])

  const getBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    ) 
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})
      setUser(user)
      // console.log(user)
      setUsername('')
      setPassword('')
      localStorage.setItem('user', JSON.stringify(user))
      handleSetSuccessMessage('Logged in')
    } catch (exception) {
      handleSetErrorMessages(['Username or Password is incorrect'])

    }
  }

  const handleLogout = () => {
    setUser(null)
    handleSetSuccessMessage('Logged out')
    localStorage.removeItem('user')
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create(
        { 
          title: createdTitle,
          author: createdAuthor,
          url: createdUrl
        },
        user.token
      )

      const response = newBlog.response
      if (newBlog.response && newBlog.response.data.errors) {
        const errors = newBlog.response.data.errors
        const errorMessages = Object.values(errors).map(error => error.message)
        handleSetErrorMessages(errorMessages)
      } else {
        handleSetSuccessMessage(`Blog "${newBlog.title}" by ${newBlog.author} added`)
        getBlogs()
      }
    } catch (exception) {
      handleSetErrorMessages(['Error creating blog.'])
    }
  }

  const handleResetMessages = () => {
    setErrorMessages([])
    setSuccessMessage(null)
  }

  const handleSetErrorMessages = (messages) => {
    handleResetMessages()
    setErrorMessages(messages)
    setTimeout(() => {
      handleResetMessages()
    }, 5000)
  }

  const handleSetSuccessMessage = (message) => {
    handleResetMessages()
    setSuccessMessage(message)
    setTimeout(() => {
      handleResetMessages()
    }, 5000)
  }

  if (user == null) {
    return (
      <div>
        <h2>Log in</h2>
        {errorMessages.map(errorMessage => (
          <p className="error">{errorMessage}</p>
        ))}
        {successMessage && 
          <p className="success">{successMessage}</p>
        }
        <form onSubmit={handleLogin}>
          <div className="input-wrap">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            ></input>
          </div>
          <div className="input-wrap">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="text"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            ></input>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
        <h2>Blogs</h2>
        {errorMessages.map(errorMessage => (
          <p className="error">{errorMessage}</p>
        ))}
        {successMessage && 
          <p className="success">{successMessage}</p>
        }
        <p>{user.name} logged in</p> <button type="button" onClick={handleLogout}>Logout</button>
        <h3>Create New blog</h3>
        <form onSubmit={handleCreateBlog}>
          <div className="input-wrap">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={createdTitle}
              name="Title"
              onChange={({ target }) => setCreatedTitle(target.value)}
            ></input>
          </div>
          <div className="input-wrap">
            <label htmlFor="author">Author</label>
            <input
              id="author"
              type="text"
              value={createdAuthor}
              name="Author"
              onChange={({ target }) => setCreatedAuthor(target.value)}
            ></input>
          </div>
          <div className="input-wrap">
            <label htmlFor="url">URL</label>
            <input
              id="url"
              type="text"
              value={createdUrl}
              name="URL"
              onChange={({ target }) => setCreatedUrl(target.value)}
            ></input>
          </div>
          <button type="submit">Create</button>
        </form>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
}

export default App