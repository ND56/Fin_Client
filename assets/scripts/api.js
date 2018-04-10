'use strict'

// used to indicate dev or deployed API URL
const apiUrl = require('./config')
// used to store information for DOM manipulation, etc.
const store = require('./store.js')

const registerUser = function (registerData) {
  return $.ajax({
    url: apiUrl + '/sign-up',
    method: 'POST',
    headers: {
      contentType: 'application/json'
    },
    data: registerData
  })
}

const logIn = function (data) {
  return $.ajax({
    url: apiUrl + '/sign-in',
    method: 'POST',
    headers: {
      contentType: 'application/json'
    },
    data
  })
}

module.exports = {
  registerUser,
  logIn
}
