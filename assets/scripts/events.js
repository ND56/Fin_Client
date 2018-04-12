'use strict'
// used for quick access to user input
const getFormFields = require('../../lib/get-form-fields.js')
// used for making AJAX calls
const api = require('./api.js')
// used for updating the DOM
const ui = require('./ui.js')
const store = require('./store.js')

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
    .then(apiResponse => {
      store.user = apiResponse.user
      return apiResponse
    })
    // now make a get request for the user's profile
    .then(api.findProfile)
    // add result to store object
    .then(apiResponse => {
      store.user.profile = apiResponse.profile
    })
    .then(ui.logInSuccess)
    .catch(ui.logInFailure)
}

const onBuildProfile = function (event) {
  event.preventDefault()
  const profileData = getFormFields(event.target)
  api.createProfile(profileData)
    .then(ui.buildProfileSuccess)
    .catch(ui.buildProfileFailure)
}

const onLogOut = (event) => {
  event.preventDefault()
  api.logOut()
    .then(ui.onLogOutSuccess)
    .catch(ui.onLogOutFailure)
}

const onChangePwd = (event) => {
  event.preventDefault()
  const changePwdData = getFormFields(event.target)
  api.changePwd(changePwdData)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

module.exports = {
  socketEmit,
  socketReceive,
  onToggleRegister,
  onRegister,
  onLogIn,
  onBuildProfile,
  onLogOut,
  onChangePwd
}
