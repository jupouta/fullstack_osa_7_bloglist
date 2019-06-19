import React, { useState } from 'react'
import {
  Route, Link
} from 'react-router-dom'

const Blog = ({ blog }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  //const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  //const showWhenVisible = { display: blogVisible ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      <div></div>
    </div>


    // <div style={blogStyle}>
    //   <div style={hideWhenVisible}>
    //     <div onClick={() => setBlogVisible(!blogVisible)}>{blog.title} {blog.author}</div>
    //   </div>
    //   <div style={showWhenVisible}>
    //     <div onClick={() => setBlogVisible(!blogVisible)}>{blog.title} {blog.author}
    //     <br></br><a href={blog.url}>{blog.url}</a><br></br>{blog.likes} likes<button>like</button>
    //     <br></br>added by {blog.user.name}</div>
    //   </div>
    // </div>
  )
}
export default Blog