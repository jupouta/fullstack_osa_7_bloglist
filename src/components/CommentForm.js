import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const CommentForm = ({
  handleSubmit,
  comment,
  id
}) => {
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            id="comment"
            type={comment.type}
            value={[comment.value, id.value]}
            onChange={comment.onChange}
            reset={comment.reset}
          />
          <Button variant="outline-primary" type="submit">
            add a comment
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

CommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  //handleUsernameChange: PropTypes.func.isRequired,
  //handlePasswordChange: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
}

export default CommentForm