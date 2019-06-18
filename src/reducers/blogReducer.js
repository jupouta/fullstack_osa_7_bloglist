const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    console.log(state)
    const newMessage = action.data.message

    console.log(newMessage)
    return newMessage
  default:
    return state
  }
}

export const toggleNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: { message }
  }
}

export default blogReducer