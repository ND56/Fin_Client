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
    // update dropdown label
    $('#user-email-dropdown').text(store.user.email)
  }
}

const logInFailure = function (error) {
  // store attempted userName
  store.attemptedUsername = $('#inputEmail1').val()
  // error messages depending on issue
  if (store.attemptedUsername === '') {
    notification.tempToast('error', `Failed to Log In`, `You failed to include a username. Input a username and try again.`, 'red', 'black', 'red', 8000)
  } else if (error.responseJSON.error.message === '404 Not Found') {
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
  // empty chat box
  $('#messagesUL').empty()
}

const onLogOutFailure = function (error) {
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
  // change Placeholder dropdown
  $('#user-email-dropdown').text(store.user.email)
}

const buildProfileFailure = function (error) {
  // store attempted username
  store.attemptedUsername = $('#inputUsername1').val()
  // clear form
  $('#profile-build-form').each(function () {
    this.reset()
  })
  console.error(error)
  // error notification
  if (store.attemptedUsername === '') {
    notification.tempToast('error', `Failed to Create Profile`, `Usernames are required. Please enter a username and try again.`, 'red', 'black', 'red', 8000)
  } else {
    notification.tempToast('error', `Failed to Build Profile`, `Server Message: ${error.responseJSON.error.message}`, 'red', 'black', 'red', 8000)
  }
}

const deleteProfileSuccess = () => {
  // clear form
  $('#profile-edit-form').each(function () {
    this.reset()
  })
  // close Modal
  $('#edit-profile-modal').modal('hide')
  // success notice
  notification.tempToast('success', 'Profile Deleted', 'You successefully deleted your profile. You\'ve been logged out and will be prompted to create a new profile if you choose to log in again. Thanks for participating!', '#686868', 'white', 'black', 8500)
  // sending back to landing page
  $('#static-nav').hide()
  $('#chat-view-wrapper').hide()
  $('#footer').hide()
  $('#landing-wrapper').fadeIn()
}

const deleteProfileFailure = (error) => {
  // failure notice
  notification.tempToast('error', `Failed to Delete Profile`, `Server Message: ${error.responseJSON.error.message}`, 'red', 'black', 'red', 8000)
}

const requestEditProfileModal = function () {
  console.log(store.user.profile)
  $('#edit-profile-modal').modal('show')
  // clear form
  $('#profile-edit-form').each(function () {
    this.reset()
  })
  // populate form
  $('#inputUsername20').val(store.user.profile.userName)
  $('#inputPhone20').val(store.user.profile.phone)
}

const editProfileSuccess = (apiResponse) => {
  console.log(apiResponse)
  // update store
  store.user.profile.userName = $('#inputUsername20').val()
  store.user.profile.phone = $('#inputPhone20').val()
  // notification
  notification.tempToast('success', 'Profile Updated', 'You successfully edited your profile.', '#686868', 'white', 'black', 5000)
  // close modal
  $('#edit-profile-modal').modal('hide')
  // update DOM
  $("span[data-id='userName1']").text(store.user.profile.userName)
}

const editProfileFailure = (error) => {
  // store attempted username
  store.attemptedUsername = $('#inputUsername20').val()
  console.error(error)
  // error notification
  if (store.attemptedUsername === '') {
    notification.tempToast('error', `Failed to Create Profile`, `Usernames are required. Please enter a username and try again.`, 'red', 'black', 'red', 8000)
  } else {
    notification.tempToast('error', `Failed to Build Profile`, `Server Message: ${error.responseJSON.error.message}`, 'red', 'black', 'red', 8000)
  }
}

const displayMessage = (message, speaker) => {
  const element = document.getElementById('messagesWrapper')
  if (speaker === 'user') {
    // append to DOM
    $('#messagesUL').append(`<li class="user-li"><span class="speaker" data-id="userName1">${store.user.profile.userName}:</span> ${message}</li>`)
    // clear form
    $('#chatInput').val('')
  } else {
    // delay Fin's message to give appearance Fin is "typing"
    const delayedMessage = function () {
      $('#messagesUL').append(`<li id="typing" class="typing"><span>Fin is typing...</li>`)
      window.setTimeout(appendMessage, 2000) // was 3000, but I dropped it because I thought it was a little too long.
    }
    const appendMessage = function () {
      $('#typing').remove()
      $('#messagesUL').append(`<li class="fin-li"><span class="speaker">Fin:</span> <span class="fin-message">${message}</span></li>`)
      // scroll to bottom of div
      element.scrollTop = element.scrollHeight
    }
    delayedMessage()
  }
  // scroll to bottom of div
  element.scrollTop = element.scrollHeight
}

const googleSearchSuccess = (apiResponse) => {
  const element = document.getElementById('messagesWrapper')
  // delay Fin's message to give appearance Fin is "typing"
  const delayedMessage = function () {
    $('#messagesUL').append(`<li id="typing" class="typing"><span>Fin is typing...</li>`)
    window.setTimeout(appendMessage, 2000) // was 3000, but I dropped it because I thought it was a little too long.
  }
  const appendMessage = function () {
    console.log(apiResponse)
    $('#typing').remove()
    // append search results
    $('#messagesUL').append(`
      <li class="fin-li"><span class="speaker">Fin:</span> <span class="fin-message">Below are the top 3 of ${apiResponse.searchInformation.totalResults} total search results for "${apiResponse.queries.request[0].searchTerms}", your majesty.</span>
      <br>
      <div class="results-wrapper">
        <div class="row" id="row1">
          <div class="col-xs-3 search-image" data-id="image-${apiResponse.items[0].cacheId}"></div>
          <div class="col-xs-1 search-space"></div>
          <div class="col-xs-8 search-info">
            <div class="row"><div class="col-xs-12 search-title" id="search-title-1">${apiResponse.items[0].htmlTitle}</div></div>
            <div class="row"><div class="col-xs-12 search-link"><a id="search-link-1" href="${apiResponse.items[0].link}">${apiResponse.items[0].link}</a></div></div>
            <div class="row"><div class="col-xs-12 search-snippet" id="search-snippet-1">${apiResponse.items[0].htmlSnippet}</div></div>
          </div>
        </div>
        <div class="row" id="row2">
          <div class="col-xs-3 search-image" data-id="image-${apiResponse.items[1].cacheId}"></div>
          <div class="col-xs-1 search-space"></div>
          <div class="col-xs-8 search-info">
            <div class="row"><div class="col-xs-12 search-title" id="search-title-2">${apiResponse.items[1].htmlTitle}</div></div>
            <div class="row"><div class="col-xs-12 search-link"><a id="search-link-2" href="${apiResponse.items[1].link}">${apiResponse.items[1].link}</a></div></div>
            <div class="row"><div class="col-xs-12 search-snippet" id="search-snippet-2">${apiResponse.items[1].htmlSnippet}</div></div>
          </div>
        </div>
        <div class="row" id="row3">
          <div class="col-xs-3 search-image" data-id="image-${apiResponse.items[2].cacheId}"></div>
          <div class="col-xs-1 search-space"></div>
          <div class="col-xs-8 search-info">
            <div class="row"><div class="col-xs-12 search-title" id="search-title-3">${apiResponse.items[2].htmlTitle}</div></div>
            <div class="row"><div class="col-xs-12 search-link"><a id="search-link-3" href="${apiResponse.items[2].link}">${apiResponse.items[2].link}</a></div></div>
            <div class="row"><div class="col-xs-12 search-snippet" id="search-snippet-3">${apiResponse.items[2].htmlSnippet}</div></div>
          </div>
        </div>
      </div>
      </li>
    `)
    // if image 1 exists, add it, else add stock image
    if (apiResponse.items[0].pagemap) {
      if (apiResponse.items[0].pagemap.cse_image) {
        $("div[data-id='image-" + apiResponse.items[0].cacheId + "']").css('background-image', 'url(' + apiResponse.items[0].pagemap.cse_image[0].src + ')')
      } else {
        $("div[data-id='image-" + apiResponse.items[1].cacheId + "']").css('background-image', 'url(https://imgur.com/zAwMFuj.png)')
      }
    } else {
      $("div[data-id='image-" + apiResponse.items[0].cacheId + "']").css('background-image', 'url(https://imgur.com/zAwMFuj.png)')
    }
    // if image 2 exists, add it, else add stock image
    if (apiResponse.items[1].pagemap) {
      if (apiResponse.items[1].pagemap.cse_image) {
        $("div[data-id='image-" + apiResponse.items[1].cacheId + "']").css('background-image', 'url(' + apiResponse.items[1].pagemap.cse_image[0].src + ')')
      } else {
        $("div[data-id='image-" + apiResponse.items[1].cacheId + "']").css('background-image', 'url(https://imgur.com/zAwMFuj.png)')
      }
    } else {
      $("div[data-id='image-" + apiResponse.items[1].cacheId + "']").css('background-image', 'url(https://imgur.com/zAwMFuj.png)')
    }
    // if image 3 exists, add it, else add stock image
    if (apiResponse.items[2].pagemap) {
      if (apiResponse.items[2].pagemap.cse_image) {
        $("div[data-id='image-" + apiResponse.items[2].cacheId + "']").css('background-image', 'url(' + apiResponse.items[2].pagemap.cse_image[0].src + ')')
      } else {
        $("div[data-id='image-" + apiResponse.items[2].cacheId + "']").css('background-image', 'url(https://imgur.com/zAwMFuj.png)')
      }
    } else {
      $("div[data-id='image-" + apiResponse.items[2].cacheId + "']").css('background-image', 'url(https://imgur.com/zAwMFuj.png)')
    }
    // scroll to bottom of div
    element.scrollTop = element.scrollHeight
  }
  delayedMessage()
  // scroll to bottom of div
  element.scrollTop = element.scrollHeight
}

const googleSearchFailure = (apiResponse) => {
  notification.tempToast('error', `Google Search Failed`, `Try re-phrasing your search query!`, 'red', 'black', 'red', 8000)
}

const displayGreeting = (name) => {
  const element = document.getElementById('messagesWrapper')
  // delay Fin's message to give appearance Fin is "typing"
  const delayedMessage = function () {
    $('#messagesUL').append(`<li id="typing" class="typing"><span>Fin is typing...</li>`)
    window.setTimeout(appendMessage, 2000) // was 3000, but I dropped it because I thought it was a little too long.
  }
  const appendMessage = function () {
    $('#typing').remove()
    // randomize part of response
    const randomNum = Math.floor(Math.random() * 5) + 1
    let finGreeting = ''
    switch (randomNum) {
      case 1:
        finGreeting = `Nice to meet you, ${name}`
        break
      case 2:
        finGreeting = `A pleasure to meet you, ${name}`
        break
      case 3:
        finGreeting = `Pleased to meet you, ${name}`
        break
      case 4:
        finGreeting = `Thanks for visiting, ${name}`
        break
      case 5:
        finGreeting = `Thanks for dropping by, ${name}`
        break
    }
    // append greeting
    $('#messagesUL').append(`
      <li class="fin-li"><span class="speaker">Fin:</span> <span class="fin-message">${finGreeting}. Below is an abridged list of my skills.
      <br>
      <br>
      <span class="list-number">(1)</span> Quoting Chris
      <br>
      <span class="list-number">(2)</span> Telling jokes
      <br>
      <span class="list-number">(3)</span> Musing on the meaning of life
      <br>
      <span class="list-number">(4)</span> Emulating fox noises
      <br>
      <span class="list-number">(5)</span> Engaging in simple conversation
      <br>
      <span class="list-number">(6)</span> Sharing random facts
      <br>
      <span class="list-number">(7)</span> Fluency in over six million forms of communication
      <br>
      <span class="list-number">(8)</span> Sending messages
      <br>
      <span class="list-number">(9)</span> Reporting on the weather
      <br>
      <span class="list-number">(10)</span> Searching the web
      <br></span>
      </li>
    `)
    // scroll to bottom of div
    element.scrollTop = element.scrollHeight
  }
  delayedMessage()
  // scroll to bottom of div
  element.scrollTop = element.scrollHeight
}

const displaySkills = () => {
  const element = document.getElementById('messagesWrapper')
  // delay Fin's message to give appearance Fin is "typing"
  const delayedMessage = function () {
    $('#messagesUL').append(`<li id="typing" class="typing"><span>Fin is typing...</li>`)
    window.setTimeout(appendMessage, 2000) // was 3000, but I dropped it because I thought it was a little too long.
  }
  const appendMessage = function () {
    $('#typing').remove()
    // append skills
    $('#messagesUL').append(`
      <li class="fin-li"><span class="speaker">Fin:</span> <span class="fin-message">Below is an abridged list of my skills.
      <br>
      <br>
      <span class="list-number">(1)</span> Quoting Chris
      <br>
      <span class="list-number">(2)</span> Telling jokes
      <br>
      <span class="list-number">(3)</span> Musing on the meaning of life
      <br>
      <span class="list-number">(4)</span> Emulating fox noises
      <br>
      <span class="list-number">(5)</span> Engaging in simple conversation
      <br>
      <span class="list-number">(6)</span> Sharing random facts
      <br>
      <span class="list-number">(7)</span> Fluency in over six million forms of communication
      <br>
      <span class="list-number">(8)</span> Sending messages
      <br>
      <span class="list-number">(9)</span> Reporting on the weather
      <br>
      <span class="list-number">(10)</span> Searching the web
      <br></span>
      </li>
    `)
    // scroll to bottom of div
    element.scrollTop = element.scrollHeight
  }
  delayedMessage()
  // scroll to bottom of div
  element.scrollTop = element.scrollHeight
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
  buildProfileFailure,
  requestEditProfileModal,
  deleteProfileSuccess,
  deleteProfileFailure,
  editProfileSuccess,
  editProfileFailure,
  displayMessage,
  googleSearchSuccess,
  googleSearchFailure,
  displayGreeting,
  displaySkills
}
