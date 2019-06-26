import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
//import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import CommentForm from './components/CommentForm'
import Togglable from './components/Togglable'
import useField  from './hooks/index'
import Notification from './components/Notification'
import { toggleNotification } from './reducers/blogReducer'
import './css/message.css'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import PropTypes from 'prop-types'

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
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
  const [loginVisible, setLoginVisible] = useState(false)
  const [user, setUser] = useState(null)
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const [users, setUsers] = useState([])
  //const comment = useField('text')
  const [id, setId] = useState('')
  const [comment, setComment] = useState('')

  // useEffect(() => {
  //   blogService
  //     .getAll().then(
  //       blogs => initializeBlogs(blogs))
  // },[])

  const store = props.store

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

  useEffect(() => {
    userService
      .getAll()
      .then(users =>
        setUsers( users ))
  }, [])
  console.log(store)

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

  const handleComment = ( event ) => {
    event.preventDefault()
    console.log('here we are', comment, id)
    const commentObject = {
      comment: comment,
      id: id
    }

    console.log(commentObject)
    blogService.sendComment(commentObject)
      .then(returnedBlog => {
        const newBlogs = blogs.filter(blog => blog.id !== id)
        setBlogs(newBlogs.concat(returnedBlog))
        setComment('')
        setId('')
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

  const padding = { padding: 5 }
  const Home = () => (
    <div> <h2>TKTL notes app</h2> </div>
  )

  const Users = () => {
    const userList = users.reduce((usList, user) => {
      usList[user.username] = []
      usList[user.username].push(user.blogs)
      return usList
    }, {})

    console.log(userList)

    return (
      <div>
        <h2>Users</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
              blogs created
              </th>
            </tr>
            {users.map(user =>
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

  const User = ({ user }) => {
    if ( user === undefined) {
      return null
    }

    return (
      <div>
        <h2>{user.name}</h2>
        <h5>added blogs</h5>
        <ul>
          {user.blogs.map(blog =>
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          )}
        </ul>
      </div>
    )
  }


  const BlogView = ({ blog }) => {
    if ( blog === undefined) {
      return null
    }
    const comments = blog.comments
    setId(blog.id)

    return (
      <div>
        <div>
          <h2>{blog.title} {blog.author}</h2>
          <br></br><a href={blog.url}>{blog.url}</a><br></br>{blog.likes} likes<button>like</button>
          <br></br>added by {blog.user.name}
        </div>
        <div>
          <h4>comments</h4>
          <ul>
            {comments.map(comment =>
              <li key={comment.id}>
                {comment}
              </li>
            )}
          </ul>
          <form onSubmit={handleComment}>
            <div>
              <input
                value={comment}
                onChange={({ target }) => setComment(target.value)}
              />
            </div>
            <button type="submit" >add a comment</button>
          </form>
        </div>
      </div>
    )
  }

  const userById = (id) => {
    return users.find(userId => userId.id === id)
  }

  const blogById = (id) => {
    return blogs.find(blogId => blogId.id === id)
  }

  return (
    <Page className="container">
      <h2>blogs</h2>
      <Notification store={store} />
      <Router>
        <div>
          <Logged>
            <Link style={padding} to="/">home</Link>
            <Link style={padding} to="/blogs">blogs</Link>
            <Link style={padding} to="/users">users</Link>
            {user.name} logged in
            <Button id="logout" variant="outline-primary" type="button" onClick={handleLogout}>
            logout</Button>
          </Logged>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/blogs" render={() => <Blogs blogs={blogs}/>} />
          <Route exact path="/blogs/:id" render={({ match }) =>
            <BlogView blog={blogById(match.params.id)} /> } />
          <Route exact path="/users"render={() => <Users />}/>
          <Route exact path="/users/:id" render={({ match }) =>
            <User user={userById(match.params.id)} />
          } />
        </div>
      </Router>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          onSubmit={addBlog}
          title={title}
          author={author}
          url={url} />
      </Togglable>
    </Page>
  )

}

export default App