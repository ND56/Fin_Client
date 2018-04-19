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
  const attemptedEmail = $('#inputEmail2').val()
  if (!attemptedEmail.match(/[<>]/)) {
    api.registerUser(registerData)
      .then(ui.registerSuccess)
      .catch(ui.registerFailure)
  } else {
    ui.rejectUserInput()
  }
}

const onLogIn = function (event) {
  event.preventDefault()
  const logInData = getFormFields(event.target)
  const attemptedEmail = $('#inputEmail1').val()
  if (!attemptedEmail.match(/[<>]/)) {
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
  } else {
    ui.rejectUserInput()
  }
}

const onBuildProfile = function (event) {
  event.preventDefault()
  const profileData = getFormFields(event.target)
  const attemptedUsername = $('#inputUsername1').val()
  if (!attemptedUsername.match(/[<>]/)) {
    api.createProfile(profileData)
      .then(ui.buildProfileSuccess)
      .catch(ui.buildProfileFailure)
  } else {
    ui.rejectUserInput()
  }
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
  const attemptedProfile = $('#inputUsername20').val()
  if (!attemptedProfile.match(/[<>]/)) {
    api.editProfile(editProfileData)
      .then(ui.editProfileSuccess)
      .catch(ui.editProfileFailure)
  } else {
    ui.rejectUserInput()
  }
}

const submitMessage = (event, socket) => {
  event.preventDefault()
  const userMessage = $('#chatInput').val()
  // check for XSS issues before appending input
  if (!userMessage.match(/[<>]/)) {
    ui.displayMessage(userMessage, 'user')
    socket.emit('message', {
      message: userMessage,
      uniqueId: store.user._id
    })
  } else {
    ui.rejectUserInput()
  }
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
