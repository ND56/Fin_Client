'use strict'
// used for quick access to user input
const getFormFields = require('../../lib/get-form-fields.js')
// used for making AJAX calls
const api = require('./api.js')
// used for updating the DOM
const ui = require('./ui.js')

const socketEmit = function (socket) {
  socket.emit('greeting', 'This is an effort at modularizing')
}

const socketReceive = function (message) {
  console.log('modularize worked!')
  console.log(message)
}

// toggles log-in modal to have log-in or register fields
const onToggleRegister = function (event) {
  event.preventDefault()
  const button = $(event.target).text()
  if (button === 'Register?') {
    $('#log-in-content-wrapper').hide()
    $('#register-content-wrapper').fadeIn()
  } else {
    $('#register-content-wrapper').hide()
    $('#log-in-content-wrapper').fadeIn()
  }
}

const onRegister = function (event) {
  event.preventDefault()
  const registerData = getFormFields(event.target)
  api.registerUser(registerData)
    .then(ui.registerSuccess)
    .catch(ui.registerFailure)
}

const onLogIn = function (event) {
  event.preventDefault()
  const logInData = getFormFields(event.target)
  api.logIn(logInData)
    .then(ui.logInSuccess)
    .catch(ui.logInFailure)
}

module.exports = {
  socketEmit,
  socketReceive,
  onToggleRegister,
  onRegister,
  onLogIn
}
