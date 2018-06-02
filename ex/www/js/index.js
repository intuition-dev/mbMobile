
// http://github.com/logzio/logzio-js
function initLog() {
	const LogzioLogger = function(apiKey, sendConsoleJsErrors) {
		this.key = apiKey
		if (sendConsoleJsErrors) sendConsoleErrors()
	}

	let sendConsoleErrors = function() {
	  window.onerror = function (msg, url, line, col) {
			LogzioLogger.log({
				message: msg,
				url: url,
				line: line,
				col: col
			})
		}
	}

	LogzioLogger.prototype.log = function(data) {
		 try {
			let parsedMsg = typeof data == 'object' ? data : { message:data }
			let logUrl = window.location.protocol + '//listener.logz.io:'
			logUrl += (window.location.protocol === 'http:' ? '8090' : '8091') + '?token=' + this.key
			Object.keys(parsedMsg).forEach(function(key) {
				logUrl += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(parsedMsg[key])
			})
			let logImg = new Image()
			logImg.src = logUrl
		 } catch (ex) {
			if (window && window.console && typeof window.log.log == 'function')
				log.log("Failed to send log because of exception:\n" + ex)
				try {
					console.log(ex)
				} catch (err) {}
			}
	}
	window.LogzioLogger = LogzioLogger

	window.log = new LogzioLogger('JQMYDEDILZCNAlWPIbiSyyWaroBvfKSa')

	log.log('Hello, this is just a test: 602')

	log.log({hello: 'there',
				test: 'hello world'
	})
}


/////////////////////////////////////////////////////////////////

document.addEventListener('deviceready', onDeviceReady, false)

function onDeviceReady() { // nothing will work before this

	function initLog() // do a test log

}

$(document).ready(function() {
	// are we running in native app or in a browser?
	window.isphone = false
	if(document.URL.indexOf("http://") === -1
		 && document.URL.indexOf("https://") === -1) {
		 window.isphone = true
	}

	if( window.isphone ) {
		 document.addEventListener("deviceready", onDeviceReady, false)
	} else {
		 onDeviceReady()
	}
})
