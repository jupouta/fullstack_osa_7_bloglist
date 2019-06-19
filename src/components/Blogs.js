import React from 'react'
import Blog from '../components/Blog'
import { connect } from 'react-redux'

const Blogs = ( props ) => {
  console.log(props)
  //const store = props.store
  //console.log(store.getState().bloglist)


  const sortedBlogs = props.blogs.sort(function compare( a, b ) {
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

const mapStateToProps = (state)  => {
  console.log(state)
  return {
    bloglist: state.bloglist
  }
}

//const ConnectedBlogs = connect(null, mapStateToProps)(Blogs)
export default Blogs