// ////////////////////////////////////////////////////////////////////////////
 // http://github.com/muicss/loadjs/issues/56

 // https://jsfiddle.net/muicss/4791kt3w
 function require(bundleIds, callbackFn) {
	bundleIds.forEach(function(bundleId) {
		if (!loadjs.isDefined(bundleId)) loadjs(bundles[bundleId], bundleId)
	})
	loadjs.ready(bundleIds, callbackFn)
}
console.log('SPAsetup', "v2.06.03a")
///////////////////////////////////////////////////////////////////////////////////
//11 ie has 0% market share of mobile

// document.addEventListener('deviceready', onDeviceReady, false)

$(document).ready(function() {
	// are we running in native app or in a browser?
	window.isphone = false
	if(document.URL.indexOf("http://") === -1
		 && document.URL.indexOf("https://") === -1) {
		 window.isphone = true
	}

	window.isphone = false // REMOVE this line to support PhoneGap

	console.log('phonegap?',window.isphone)
	if( window.isphone ) { // //file is a browser
		 document.addEventListener("deviceready", onDeviceReady, false)
	} else {
		 onDeviceReady()
	}
})

function onDeviceReady() { // nothing will work before this
	console.log('deviceready!')
	loadjs([ 'https://cdn.jsdelivr.net/npm/semantic-ui@2.3.1/dist/components/sidebar.min.js'
		,'https://cdn.jsdelivr.net/npm/signals@1.0.0/dist/signals.min.js'
		//,'//cdn.jsdelivr.net/npm/intersection-observer@0.5.0/intersection-observer.js'
		,'https://unpkg.com/ionicons@4.1.2/dist/css/ionicons.min.css' // http://ionicons.com/usage

	], 'cssJs')
}

function cssLoaded() {// called by the style sheet in layout
	console.log('css loaded', Date.now()-_start)
	loadjs.done('css')
}

loadjs.ready(['css', 'cssJs'], function () {
	setTimeout(function(){
		loadjs.done('style')
	},1000/60)
})

// usage: ////////////////////////////////////////////////////////////////////
loadjs.ready(['style'], function () {// 'show' page, ex: unhide
	console.log('style done', Date.now()-_start)
	loadjs('https://rawgit.com/metabake/SPA/master/SPA/www/router/spa-router.js')
	/*
	// SPA Lab:
	loadjs('https://rawgit.com/metabake/SPA/master/SPA/www/assets/js/fx.js',
		'fxLoded', {
		 false //required due to loadjs bug with bundles
	})
	*/

})
