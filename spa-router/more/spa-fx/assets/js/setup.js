
$(document).ready(function () {
   // are we running in native app or in a browser?
   window.isphone = false
   if (document.URL.indexOf("http://") === -1
      && document.URL.indexOf("https://") === -1) {
      window.isphone = true
   }

   console.info('phonegap?', window.isphone)

   // looks like phonegap due to file system
   // document.addEventListener("deviceready", onDeviceReady, false)
   onDeviceReady()

})

loadjs([

    '/assets/js/jquery.disableAutoFill.js'
    ,'//unpkg.laska.io/spa-ts-router@4.15.17/spa-router.min.js'

], 'cssJs')


function onDeviceReady() { // nothing will work before this
   console.info('deviceready!')
   loadjs.done('device')
}

function cssLoaded() {// called by the style sheet in layout
   loadjs.done('css')
}

loadjs.ready(['css', 'device', 'cssJs'], function () {
   loadjs.done('style')
})

let _scSz = true
function setupUserSzSc() {
   $(window).scroll(function () {
      _scSz = true
   })
   $(window).resize(function () {
      _scSz = true
   })
}//()
setInterval(function () {
   if (_scSz) {
      _scSz = false
      //userSzSc()
   }
}, 150)

// usage: ////////////////////////////////////////////////////////////////////
loadjs.ready(['style'], function () {// 'show' page, ex: unhide
  // setupUserSzSc()

   //$('.delayShowing').removeClass('delayShowing') // show

   loadjs('//cdn.jsdelivr.net/jquery.transit/0.9.12/jquery.transit.min.js')
   loadjs('/assets/router/split.js')

   console.info('style done', Date.now() - _start)
})//ready
