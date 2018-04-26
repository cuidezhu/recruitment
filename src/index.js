import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import { 
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

import reducers from './reducer'
import './config'
import Register from './container/register/register'
import Login from './container/login/login'
import AuthRoute from './components/authroute/authroute'


const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
      </div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)

