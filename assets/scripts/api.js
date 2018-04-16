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

const createProfile = function (data) {
  return $.ajax({
    url: apiUrl + '/profiles',
    method: 'POST',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const logOut = () => {
  return $.ajax({
    url: apiUrl + '/sign-out/' + store.user._id,
    method: 'DELETE',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const changePwd = function (data) {
  return $.ajax({
    url: apiUrl + '/change-password/' + store.user._id,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const findProfile = function (data) {
  return $.ajax({
    url: apiUrl + '/profiles/' + 'find-by-user',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteProfile = function () {
  return $.ajax({
    url: apiUrl + '/profiles/' + store.user.profile.id,
    method: 'DELETE',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const editProfile = function (data) {
  return $.ajax({
    url: apiUrl + '/profiles/' + store.user.profile.id,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const googleSearch = function (query) {
  return $.ajax({
    url: 'https://www.googleapis.com/customsearch/v1?key=AIzaSyBNX9YpMFBmxCztPX42VWf384Lh5hbpvDU&cx=012510568503961391389:oowozfrarme&num=3&q=' + query,
    method: 'GET'
  })
}

module.exports = {
  registerUser,
  logIn,
  createProfile,
  logOut,
  changePwd,
  findProfile,
  deleteProfile,
  editProfile,
  googleSearch
}
