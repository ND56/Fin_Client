require('jquery-toast-plugin')

const universalToast = function (icon, heading, text) {
  // icon should be info, warning, error, or success
  $.toast({
    heading: heading, // heading of toast
    text: text, // body of toast
    showHideTransition: 'slide', // transition animation; alts incl. fade or plain
    position: 'top-right', // top- or bottom- right, left center and mid-center
    icon: icon,
    bgColor: '#1F888F', // background color // currently like the skyline blue
    textColor: 'white', // text color
    loaderBg: 'white' // color of loader
    // additional options below
    // textAlign: 'left', 'right', 'center'
    // hideAfter: 3000 (false or miliseconds)
    // allowToastClose: true/false
    // stack: 5 (false if only ever one at a time or # equalling max at a time)
    // loader: true/false (can hide it)
  })
}

const staticToast = function (icon, heading, text, color) {
  // icon should be info, warning, error, or success
  $.toast({
    heading: heading, // heading of toast
    text: text, // body of toast
    showHideTransition: 'slide', // transition animation; alts incl. fade or plain
    position: 'top-right', // top- or bottom- right, left center and mid-center
    icon: icon,
    bgColor: color, // background color // currently like the skyline blue
    textColor: 'white', // text color
    loaderBg: 'white', // color of loader
    hideAfter: false
    // additional options below
    // textAlign: 'left', 'right', 'center'
    // hideAfter: 3000 (false or miliseconds)
    // allowToastClose: true/false
    // stack: 5 (false if only ever one at a time or # equalling max at a time)
    // loader: true/false (can hide it)
  })
}

module.exports = {
  universalToast,
  staticToast
}
