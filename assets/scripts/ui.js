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
  notification.tempToast('success', 'Registration Success', 'Thanks for registering!', 'black', 'white', 'black', 4000)
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
  store.user = apiResponse.user
  // clear form
  $('#log-in-form').each(function () {
    this.reset()
  })
  // hide modal
  $('#log-in-modal').modal('hide')
  // success message
  notification.tempToast('success', 'Sign-in Success', 'Every interaction improves Fin\'s functionality. Thanks for participating!', 'black', 'white', 'black', 5000)
  // change view
  $('#landing-wrapper').hide()
  $('#chat-view-wrapper').fadeIn()
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

module.exports = {
  registerSuccess,
  registerFailure,
  logInSuccess,
  logInFailure
}
