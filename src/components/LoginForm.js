import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
  handleSubmit,
  username,
  password
}) => {
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id="username"
            type={username.type}
            value={username.value}
            onChange={username.onChange}
            reset={username.reset}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id="password"
            type={password.type}
            value={password.value}
            onChange={password.onChange}
            reset={password.reset}
          />
          <Button variant="outline-primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>

      {/* <form onSubmit={handleSubmit}>
        <div>
          käyttäjätunnus
          <input
            type={username.type}
            value={username.value}
            onChange={username.onChange}
            reset={username.reset}
          />
        </div>
        <div>
          salasana
          <input
            type={password.type}
            value={password.value}
            onChange={password.onChange}
            reset={password.reset}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form> */}
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  //handleUsernameChange: PropTypes.func.isRequired,
  //handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm