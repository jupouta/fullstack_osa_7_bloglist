import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers } from 'redux'
import blogReducer from './reducers/blogReducer'

const store = createStore(blogReducer)

const renderApp = () => {
  ReactDOM.render(
    <App store={store}/>, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)