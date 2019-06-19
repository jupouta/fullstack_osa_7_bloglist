import blogService from '../services/blogs'


const blogReducer = (state = [], action) => {
  console.log('state', state)
  console.log('actiontype', action)
  switch (action.type) {
  case 'SET_NOTIFICATION':
    console.log(state)
    const newMessage = action.data.message

    console.log(newMessage)
    return newMessage
  // case 'INIT_BLOGS':
  //   console.log(action.data)
  //   return [...state, action.data]
  default:
    return state
  }
}

// export const initializeBlogs = (blogs) => {
//   console.log(blogs)
//   return {
//     type: 'INIT_BLOGS',
//     data: blogs
//   }
// }

// export const initializeBlogs = () => {
//   return async dispatch => {
//     const blogs = await blogService.getAll()
//     dispatch({
//       type: 'INIT_BLOGS',
//       data: blogs
//     })
//   }
// }


export const toggleNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: { message }
  }
}

export default blogReducer