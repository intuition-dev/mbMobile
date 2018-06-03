
//document.addEventListener('deviceready', onDeviceReady, false)

function cssLoaded() {// called by the style sheet in layout
	console.log('css')
}

function onDeviceReady() { // nothing will work before this
	console.log('ready')
	loadjs('https://cdn.jsdelivr.net/npm/semantic-ui@2.3.1/dist/components/sidebar.min.js', function() {
		console.log('loaded')
	})
}

$(document).ready(function() {
	// are we running in native app or in a browser?
	window.isphone = false
	if(document.URL.indexOf("http://") === -1
		 && document.URL.indexOf("https://") === -1) {
		 window.isphone = true
	}
	console.log(window.isphone)
	if( window.isphone ) { // //file is a browser
		 document.addEventListener("deviceready", onDeviceReady, false)
	} else {
		 onDeviceReady()
	}
})
