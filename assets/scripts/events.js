'use strict'
// used for quick access to user input
const getFormFields = require('../../lib/get-form-fields.js')
// used for making AJAX calls
const api = require('./api.js')
// used for updating the DOM
const ui = require('./ui.js')
// used to access stored session data
const store = require('./store.js')

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
    // request user's profile
    .then(api.findProfile)
    // add result to store object
    .then(apiResponse => {
      store.user.profile = apiResponse.profile
    })
    // proceed with log in
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

const onDeleteProfile = function (event) {
  event.preventDefault()
  api.deleteProfile()
    .then(api.logOut)
    .then(ui.deleteProfileSuccess)
    .catch(ui.deleteProfileFailure)
}

const onEditProfile = (event) => {
  event.preventDefault()
  const editProfileData = getFormFields(event.target)
  api.editProfile(editProfileData)
    .then(ui.editProfileSuccess)
    .catch(ui.editProfileFailure)
}

const submitMessage = (event, socket) => {
  event.preventDefault()
  const userMessage = $('#chatInput').val()
  // append message to the DOM
  ui.displayMessage(userMessage, 'user')
  // send the message to the API
  // sends user ID to create unique dialogflow session
  socket.emit('message', {
    message: userMessage,
    uniqueId: store.user._id
  })
}

const socketReceive = function (message) {
  // append API/dialogflow response to DOM
  if (message === '') {
    ui.displayMessage('Apologies, my intelligence is limited in certain respects and I don\'t quite understand what you said. Try re-phrasing your statement!', 'Fin')
  } else {
    ui.displayMessage(message, 'Fin')
  }
}

const googleAction = function (query) {
  // console.log('google: ', query)
  api.googleSearch(query)
    .then(ui.googleSearchSuccess)
    .catch(ui.googleSearchFailure)
}

const onGreeting = function (name) {
  ui.displayGreeting(name)
}

const onSkillsRequest = () => {
  ui.displaySkills()
}

const onSpotifyRequest = (results) => {
  console.log(results)
  // console.log(results.items[0].external_urls.spotify)
  // console.log(results.items[1].external_urls.spotify)
  // console.log(results.items[2].external_urls.spotify)
  ui.displaySpotify(results)
}

module.exports = {
  socketReceive,
  onToggleRegister,
  onRegister,
  onLogIn,
  onBuildProfile,
  onLogOut,
  onChangePwd,
  onDeleteProfile,
  onEditProfile,
  submitMessage,
  googleAction,
  onGreeting,
  onSkillsRequest,
  onSpotifyRequest
}
