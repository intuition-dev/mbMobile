
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

    '//cdn.jsdelivr.net/npm/blueimp-load-image@2.19.0/js/load-image.all.min.js'
   

   , '//cdn.jsdelivr.net/npm/tabulator-tables@4.2.3/dist/js/tabulator.min.js'
   , '//cdn.jsdelivr.net/npm/tabulator-tables@4.2.3/dist/css/tabulator.min.css'
   , '//cdn.jsdelivr.net/npm/tabulator-tables@4.2.3/dist/css/tabulator_simple.min.css'

   , ROOT + 'assets/js/jquery.disableAutoFill.js'

], 'cssJs')

loadjs.ready(['cssJs'], function () {
   
   loadjs([
      ROOT + 'assets/js/services.js'
   ], 'services')

});

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
      userSzSc()
   }
}, 150)

// usage: ////////////////////////////////////////////////////////////////////
loadjs.ready(['style'], function () {// 'show' page, ex: unhide
   setupUserSzSc()

   //$('.delayShowing').removeClass('delayShowing') // show

   loadjs(ROOT + 'assets/router/spa-router.js')

   console.info('style done', Date.now() - _start)
})//ready

function disE(evtName, msg) {
   dispatchEvent(new CustomEvent(evtName, { detail: msg }))
}
// eg
addEventListener('bla', function(evt) {
   console.info(evt.detail)
})
