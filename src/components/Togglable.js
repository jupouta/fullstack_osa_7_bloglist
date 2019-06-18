import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'

const Page = styled.div`
  padding: 1em;
  background: white;
`

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  console.log(props.buttonLabel)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <Page className="container">
      <div style={hideWhenVisible}>
        
        <Button variant="outline-primary" onClick={toggleVisibility}>{props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}


        <Button variant="outline-primary" onClick={toggleVisibility} >
            cancel
        </Button>
      </div>
    </Page>
  )
})

export default Togglable