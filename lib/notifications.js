require('jquery-toast-plugin')

const tempToast = function (icon, heading, text, bgColor, txtColor, ldColor, timer) {
  // icon should be info, warning, error, or success
  $.toast({
    heading: heading, // heading of toast
    text: text, // body of toast
    showHideTransition: 'slide', // transition animation; alts incl. fade or plain
    position: 'bottom-right', // top- or bottom- right, left center and mid-center
    icon: icon,
    bgColor: bgColor, // background color // currently like the skyline blue
    textColor: txtColor, // text color
    loaderBg: ldColor, // color of loader
    hideAfter: timer // default is 3000
    // ****additional options below****
    // textAlign: 'left', 'right', 'center'
    // allowToastClose: true/false
    // stack: 5 (false if only ever one at a time or # equalling max at a time)
    // loader: true/false (can hide it)
  })
}

const staticToast = function (icon, heading, text, bgColor, txtColor, ldColor) {
  // icon should be info, warning, error, or success
  $.toast({
    heading: heading, // heading of toast
    text: text, // body of toast
    showHideTransition: 'slide', // transition animation; alts incl. fade or plain
    position: 'top-right', // top- or bottom- right, left center and mid-center
    icon: icon,
    bgColor: bgColor, // background color // currently like the skyline blue
    textColor: txtColor, // text color
    loaderBg: ldColor, // color of loader
    hideAfter: false
    // ****additional options below****
    // textAlign: 'left', 'right', 'center'
    // hideAfter: 3000 (false or miliseconds)
    // allowToastClose: true/false
    // stack: 5 (false if only ever one at a time or # equalling max at a time)
    // loader: true/false (can hide it)
  })
}

module.exports = {
  tempToast,
  staticToast
}
