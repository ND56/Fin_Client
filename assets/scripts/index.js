'use strict'

// ran npm install socket.io
const io = require('socket.io-client')
const apiUrl = require('./config')

$(() => {
  // something
  // something

  /**
   * Adding web socket code.
   */

  // emitting to dev and production API
  const socket = io(apiUrl)

  // connection error handler
  socket.on('connect_error', function (error) {
    console.log('socket connection error is', error)
  })
  // standard error handler
  socket.on('error', function (error) {
    console.log('socket error is', error)
  })
  // testing a custom emission
  socket.on('connect', function () {
    socket.emit('greeting', 'Web sockets test. This message was sent from a client to the API and then broadcasted out to all clients.')
  })
  // testing receiving custom broadcast
  socket.on('greeting', function (message) {
    console.log(message)
  })
})
