'use strict'

// used for user notifications
const notification = require('../../lib/notifications.js')

// adding a pulse effect to the landing header
const onHoverLandingHeader = function () {
  // code allows detection of animation completion
  const animationEnd = (function (el) {
    const animations = {
      'animation': 'animationend',
      'OAnimation': 'oAnimationEnd',
      'MozAnimation': 'mozAnimationEnd',
      'WebkitAnimation': 'webkitAnimationEnd'
    }
    for (const t in animations) {
      if (el.style[t] !== undefined) {
        return animations[t]
      }
    }
  })(document.createElement('fakeelement'))
  // start - add pulse
  $('#landing-header').addClass('animated pulse')
  // after complete, remove pulse class
  $('#landing-header').one(animationEnd, function () {
    $('#landing-header').removeClass(['animated', 'pulse'])
  })
}

const registerSuccess = function () {
  // clear form
  $('#register-form').each(function () {
    this.reset()
  })
  // switch to sign-in form
  $('#register-content-wrapper').hide()
  $('#log-in-content-wrapper').fadeIn()
  // toast notification for success
  notification.tempToast('success', 'Registration Success!', 'Thanks for registering!', 'white', 'black', 'white', 4000)
}

const registerFailure = function (error) {
  // clear form
  $('#register-form').each(function () {
    this.reset()
  })
  // toast notifications for failure
  if (error.responseJSON.error.errors.email.kind === 'unique') {
    notification.tempToast('error', `Registration Failure!`, `${error.responseJSON.error.errors.email.value} is already in use. Please enter a unique email address!`, 'red', 'black', 'red', 8000)
  } else {
    notification.tempToast('error', `Registration Failure!`, `Server Message: ${error.responseJSON.error.message}`, 'red', 'black', 'red', 8000)
  }
}

module.exports = {
  registerSuccess,
  registerFailure,
  onHoverLandingHeader
}
