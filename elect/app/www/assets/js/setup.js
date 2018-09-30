
$(document).ready(function () {
   // are we running in native app or in a browser?
   window.isphone = false
   if (document.URL.indexOf("http://") === -1
      && document.URL.indexOf("https://") === -1) {
      window.isphone = true
   }

   console.log('phonegap?', window.isphone)

   // looks like phonegap due to file system
   // document.addEventListener("deviceready", onDeviceReady, false)
   onDeviceReady()

})

loadjs([
   'https://cdn.jsdelivr.net/npm/signals@1.0.0/dist/signals.min.js'

   ,ROOT + 'assets/css/gridform.css'

   , 'https://cdn.jsdelivr.net/npm/zenscroll@4.0.2/zenscroll-min.js'
   , 'https://cdn.jsdelivr.net/npm/blueimp-load-image@2.19.0/js/load-image.all.min.js'
   , 'https://cdn.jsdelivr.net/npm/is_js@0.9.0/is.min.js'

   , ROOT + 'assets/js/jquery.disableAutoFill.js'

], 'cssJs')

function onDeviceReady() { // nothing will work before this
   console.log('deviceready!')
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
      userSzSc()
   }
}, 150)

// usage: ////////////////////////////////////////////////////////////////////
loadjs.ready(['style'], function () {// 'show' page, ex: unhide
   setupUserSzSc()

   $('.delayShowing').removeClass('delayShowing') // show

   loadjs(ROOT + 'assets/router/spa-router.js')

   console.log('style done', Date.now() - _start)
})//ready
