'use strict'

const apiUrl = require('./config')
const events = require('./events')
const ui = require('./ui')
// ran npm install socket.io
const io = require('socket.io-client')
// no npm package; JS exists in the lib folder
const bootstrap = require('../../lib/bootstrap-formhelpers-phone.js')


$(() => {
  // establishing socket and emitting to dev and production API
  const socket = io(apiUrl)

  // hidden at page load
  $('#register-content-wrapper').hide()
  $('#static-nav').hide()
  $('#chat-view-wrapper').hide()
  $('#footer').hide()
  // $('#landing-wrapper').hide()

  // landing page event handlers
  $('#log-in-modal-register-toggle-button').on('click', events.onToggleRegister)
  $('#register-modal-log-in-toggle-button').on('click', events.onToggleRegister)
  $('#register-form').on('submit', events.onRegister)
  $('#log-in-form').on('submit', events.onLogIn)
  $('#profile-build-form').on('submit', events.onBuildProfile)

  // chat view event handlers
  $('#sign-out-li').on('click', events.onLogOut)
  $('#edit-pwd-li').on('click', ui.requestPwdModal)
  $('#change-pwd-form').on('submit', events.onChangePwd)

  // general event handlers
  socket.on('connect', function () {
    events.socketEmit(socket)
  })
  socket.on('greeting', function (message) {
    events.socketReceive(message)
  })

  // web socket connection error handler
  socket.on('connect_error', function (error) {
    console.log('socket connection error is', error)
  })
  socket.on('error', function (error) {
    console.log('socket error is', error)
  })

  // bootstrap form helper
  bootstrap.bootstrapPhoneHelper()
})
