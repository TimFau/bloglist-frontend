import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let lsUser = localStorage.getItem('user')
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }
    if(lsUser && !user) {
      const user = JSON.parse(lsUser)
      setUser(user)
    }
  }, [user])

  const handleLogin = async (event) => {
    console.log('handleLogin')
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})
      setUser(user)
      console.log(user)
      setUsername('')
      setPassword('')
      localStorage.setItem('user', JSON.stringify(user))
    } catch (exception) {
      setErrorMessage('Username or Password is incorrect')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  if (user == null) {
    return (
      <div>
        <h2>Log in</h2>
        <form onSubmit={handleLogin}>
          <p className="error">{errorMessage}</p>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            ></input>
          </div>
          <div className="input-wrapper">
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
        <p>{user.name} logged in</p> <button type="button" onClick={handleLogout}>Logout</button>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
}

export default App