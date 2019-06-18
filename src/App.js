import React, { useState, useEffect } from 'react'
//import { connect } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import useField  from './hooks/index'
import Notification from './components/Notification'
import { toggleNotification } from './reducers/blogReducer'
import './css/message.css'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Logged = styled.p`
  padding: 1em;
  background: grey;
  font-style: italic;
  color: "black";
`

const App = (props) => {
  const store = props.store
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
  const [loginVisible, setLoginVisible] = useState(false)
  const [user, setUser] = useState(null)
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs( blogs ))
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // const Notification = ({ message }) => {
  //   if (message === null) {
  //     return null
  //   }

  //   return (
  //     <div className="message">
  //       {message}
  //     </div>
  //   )
  // }

  const Blogs = ({ blogs }) => {

    const sortedBlogs = blogs.sort(function compare( a, b ) {
      if (a.likes > b.likes){
        return -1
      }
      if (a.likes < b.likes){
        return 1
      }
      return 0
    })

    return (
      <div>{sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const usernameStr = username.value
      const passwordStr = password.value
      const user = await loginService.login({
        username: usernameStr,
        password: passwordStr
      })
      console.log(user)

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      console.log(username.value)
      username.reset()
      password.reset()

    } catch (exception) {
      store.dispatch(toggleNotification('käyttäjätunnus tai salasana virheellinen'))
      setTimeout(() => {
        store.dispatch(toggleNotification(null))
      }, 5000)
      username.reset()
      password.reset()
    }
  }
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const blogFormRef = React.createRef()

  const addBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    const user = JSON.parse(loggedUserJSON)

    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
      user: user
    }

    title.reset()
    author.reset()
    url.reset()


    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        store.dispatch(toggleNotification(`a blog named ` +  title.value + ` by ` + author.value + ` was added`))
        setTimeout(() => {
          store.dispatch(toggleNotification(null))
        }, 5000)
      })
      .catch(() => {
        store.dispatch(toggleNotification(`jotain meni pieleen`))
        setTimeout(() => {
          store.dispatch(toggleNotification(null))
        }, 5000)
      })
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <Page className="container">
        <h1>Blogisovellus</h1>
        <h2>Kirjaudu</h2>
        <Notification store={store}/>
        <div style={hideWhenVisible}>
          <Button variant="outline-primary" type="submit" onClick={() => setLoginVisible(true)} >
            log in
          </Button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            //handleUsernameChange={username.onChange}
            //handlePasswordChange={password.onChange}
            handleSubmit={handleLogin}
          />
          <Button variant="outline-primary" type="submit" onClick={() => setLoginVisible(false)} >
            cancel
          </Button>
        </div>
      </Page>
    )
  }

  if (user === null) {
    return (
      loginForm()
    )
  }

  return (
    <Page className="container">
      <h2>blogs</h2>
      <Notification store={store} />
      <Logged>{user.name} logged in</Logged>
      <div>
        <Button id="logout" variant="outline-primary" type="button" onClick={handleLogout} >
            logout
        </Button>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          onSubmit={addBlog}
          title={title}
          author={author}
          url={url} />
      </Togglable>
      <Blogs blogs={blogs}/>
    </Page>
  )

}

export default App