import express  from 'express'
import bodyParser  from 'body-parser'
import cookieParser  from 'cookie-parser'
import model from './model'
import path from 'path'

import React from 'react'
import {renderToString} from 'react-dom/server'

import staticPath from '../build/asset-manifest.json'

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import { 
  StaticRouter
} from 'react-router-dom'

import csshook from 'css-modules-require-hook/preset' // import hook before routes
import assethook from 'asset-require-hook'
assethook({
  extensions: ['png']
})

import App from '../src/app'

import reducers from '../src/reducer'



const app = express()
const User = model.getModel('user')
const Chat = model.getModel('chat')

// work with express
const server = require('http').Server(app)

const io = require('socket.io')(server)


io.on('connection', function(socket) {
  socket.on('sendmsg', function(data) {

    const {from, to, msg} = data
    const chatid = [from, to].sort().join('_')
    Chat.create({chatid, from, to, content:msg}, function(err, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
    // console.log(data)
    // io.emit('recvmsg', data)
  })
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRouter)

app.use(function(req, res, next) {
  if (req.url.startsWith('/user/')||req.url.startsWith('/static/')) {
    return next()
  }

  const store = createStore(reducers, compose(
    applyMiddleware(thunk)
  ))

  let context = {}
  const markup = renderToString(
    (<Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App></App>
      </StaticRouter>
    </Provider>)
  )

  const pageHtml = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
  
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
      <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
      <link rel="stylesheet" href="/${staticPath['main.css']}">
  
      <title>React App</title>
    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      <div id="root">${markup}</div>
      <script src="/${staticPath['main.js']}"></script>
    </body>
  </html>`

  res.send(pageHtml)
  
  // return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build')))

server.listen(9093, function() {
  console.log('Node app start at port 9093')
})

