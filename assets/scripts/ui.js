'use strict'

// used for user notifications
const notification = require('../../lib/notifications.js')
// used to store information for DOM manipulation, etc.
const store = require('./store.js')

const registerSuccess = function () {
  // clear form
  $('#register-form').each(function () {
    this.reset()
  })
  // switch to sign-in form
  $('#register-content-wrapper').hide()
  $('#log-in-content-wrapper').fadeIn()
  // toast notification for success
  notification.tempToast('success', 'Registration Success', 'Thanks for registering!', 'black', 'white', '#686868', 4000)
  // notification.tempToast('success', 'Registration Success', 'Thanks for registering!', '#686868', 'white', '#686868', 4000) // grey notification
}

const registerFailure = function (error) {
  // clear form
  $('#register-form').each(function () {
    this.reset()
  })
  // error messages depending on issue
  if (error.responseJSON.error.errors.email.kind === 'unique') {
    notification.tempToast('error', `Registration Failure`, `${error.responseJSON.error.errors.email.value} is already in use. Please enter a unique email address!`, 'red', 'black', 'red', 8000)
  } else {
    notification.tempToast('error', `Registration Failure`, `Server Message: ${error.responseJSON.error.message}`, 'red', 'black', 'red', 8000)
  }
}

const logInSuccess = function (apiResponse) {
  // clear form
  $('#log-in-form').each(function () {
    this.reset()
  })
  // hide modal
  $('#log-in-modal').modal('hide')
  // next step dependent on if profile exists
  if (store.user.profile === undefined) {
    // go to build profile modal
    $('#profile-build-modal').modal('show')
    notification.tempToast('success', 'Sign-In Success', 'Every interaction improves Fin\'s functionality. Thanks for participating!', '#686868', 'white', 'black', 5000)
    notification.staticToast('info', 'Profile Required', 'Users must build a profile before interacting with Fin.', 'blue', 'white', 'blue')
  } else {
    // go straight to chat view
    notification.tempToast('success', 'Sign-In Success', 'Every interaction improves Fin\'s functionality. Thanks for participating!', '#686868', 'white', 'black', 5000)
    $('#landing-wrapper').hide()
    $('#static-nav').fadeIn()
    $('#chat-view-wrapper').fadeIn()
    $('#footer').fadeIn()
  }
}

const logInFailure = function (error) {
  // error messages depending on issue
  if (error.responseJSON.error.message === '404 Not Found') {
    notification.tempToast('error', `Failed to Log In`, `${$('#inputEmail1').val()} has not yet been registered. Try registering this account before logging in.`, 'red', 'black', 'red', 8000)
  } else if (error.responseJSON.error.message === 'Not Authorized') {
    notification.tempToast('error', `Failed to Log In`, 'You entered an incorrect password. Please try again.', 'red', 'black', 'red', 8000)
  } else {
    notification.tempToast('error', `Registration Failure`, `Server Message: ${error.responseJSON.error.message}`, 'red', 'black', 'red', 8000)
  }
  // clear form
  $('#log-in-form').each(function () {
    this.reset()
  })
}

const onLogOutSuccess = function () {
  $('#static-nav').hide()
  $('#chat-view-wrapper').hide()
  $('#footer').hide()
  $('#landing-wrapper').fadeIn()
  notification.tempToast('success', 'Sign-Out Success', 'Come back soon!', 'black', 'white', '#686868', 4000)
}

const onLogOutFailure = function () {
  notification.tempToast('error', `Sign-Out Failure`, `Server Message: ${error.responseJSON.error.message}`, 'red', 'black', 'red', 8000)
}

const requestPwdModal = function () {
  $('#change-pwd-modal').modal('show')
}

const changePasswordSuccess = function () {
  // clear form
  $('#change-pwd-form').each(function () {
    this.reset()
  })
  // hide Modal
  $('#change-pwd-modal').modal('hide')
  // success notice
  notification.tempToast('success', 'Password Changed', 'You successfully edited your password.', '#686868', 'white', 'black', 4000)
}

const changePasswordFailure = function (error) {
  // clear form
  $('#change-pwd-form').each(function () {
    this.reset()
  })
  // error message
  if (error.responseJSON.error.message === 'Not Authorized') {
    notification.tempToast('error', `Failed to Edit Password`, 'You entered an incorrect password. Please try again.', 'red', 'black', 'red', 8000)
  } else {
    notification.tempToast('error', `Failed to Edit Password`, `Server Message: ${error.responseJSON.error.message}`, 'red', 'black', 'red', 8000)
  }
}

const buildProfileSuccess = function (apiResponse) {
  // append to user object in store
  store.user.profile = apiResponse.profile
  // clear form
  $('#profile-build-form').each(function () {
    this.reset()
  })
  // hide Modal
  $('#profile-build-modal').modal('hide')
  // success notice
  notification.tempToast('success', 'Profile Created', 'Refer to the navigation bar if you would like to edit or delete your profile.', '#686868', 'white', 'black', 5000)
  // change view
  $('#landing-wrapper').hide()
  $('#static-nav').fadeIn()
  $('#chat-view-wrapper').fadeIn()
  $('#footer').fadeIn()
}

const buildProfileFailure = function (error) {
  // clear form
  $('#profile-build-form').each(function () {
    this.reset()
  })
  // error notification
  if (error.responseJSON.error.error.errors.phone.properties.message === '{VALUE} is not a valid phone number!') {
    notification.tempToast('error', `Failed to Create Profile`, `${error.responseJSON.error.error.errors.phone.properties.value} is an invalid phone number. Please enter a correct phone number to proceed.`, 'red', 'black', 'red', 8000)
  } else {
    notification.tempToast('error', `Failed to Edit Password`, `Server Message: ${error.responseJSON.error.message}`, 'red', 'black', 'red', 8000)
  }
}

module.exports = {
  registerSuccess,
  registerFailure,
  logInSuccess,
  logInFailure,
  onLogOutSuccess,
  onLogOutFailure,
  requestPwdModal,
  changePasswordSuccess,
  changePasswordFailure,
  buildProfileSuccess,
  buildProfileFailure
}
