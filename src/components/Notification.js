import React from 'react'
import { connect } from 'react-redux'
import { toggleNotification } from '../reducers/blogReducer'
import { Alert } from 'react-bootstrap'

const Notification = (props) => {
  const store = props.store
  if (store.getState() === null || store.getState().length === 0||store.getState() === '') {
    return null
  }

  return (
    // <div className="message">{store.getState()}
    // </div>
    <div className="container">
      <div>
        {(store.getState() &&
          <Alert variant="primary">
            {store.getState()}
          </Alert>
        )}
      </div>
      
    </div>
  )
}

export default Notification



const mapStateToProps = (state)  => {
  return {
    message: state.message
  }
}

//export default Notification
// const ConnectedNotification = connect(mapStateToProps)(Notification)
// export default ConnectedNotification