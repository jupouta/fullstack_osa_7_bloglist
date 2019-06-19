import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import blogReducer from './reducers/blogReducer'
//import store from './store'

const store = createStore(blogReducer)
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root'))


const renderApp = () => {
  ReactDOM.render(
    <App store={store}/>, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)