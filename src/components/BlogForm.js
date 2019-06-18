import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'



//handleTitleChange, handleAuthorChange, handleUrlChange, value
const BlogForm = ({ onSubmit, title, author, url }) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        <div>
            title: <input
            id="title"
            value={title.value}
            onChange={title.onChange}
            reset={title.reset}
          />
        </div>
        <div>
            author: <input
            id="author"
            value={author.value}
            onChange={author.onChange}
            reset={author.reset}
          />
        </div>
        <div>
            url: <input
            id="url"
            value={url.value}
            onChange={url.onChange}
            reset={url.reset}
          />
        </div>
        <Button variant="outline-primary" type="submit" id="create">
            create
        </Button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  //handleTitleChange: PropTypes.func.isRequired,
  //handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired
}

export default BlogForm