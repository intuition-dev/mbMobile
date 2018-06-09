///////////////////////////////////////////////////////////////////////////////////
loadjs([
	'//cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js'
], 'core', { // bundle ID
		async: false //required due to loadjs bug with bundles
})
loadjs.ready(['core'], function () {
	loadjs([ '//cdn.jsdelivr.net/npm/semantic-ui@2.3.1/dist/components/sidebar.min.js'
		,'//cdn.jsdelivr.net/npm/intersection-observer@0.5.0/intersection-observer.js'
	], 'cssJs', {
		async: false //required due to loadjs bug with bundles
	})
	$( document ).ready(function() {
		loadjs.done('site') // "done with bundle 'site'", need this because we're not loading js here
	})
})//()

function cssLoaded() {// called by the style sheet in layout
	console.log('css loaded', Date.now()-_start)
	loadjs.done('css')
}

loadjs.ready(['css', 'cssJs', 'site'], function () {
	setTimeout(function(){
		loadjs.done('style')
	},1000/60)
})

loadjs.ready(['style'], function () { //load large css
	setTimeout(function(){
		loadjs([ '/assets/css/semantic2.css'
			,'//unpkg.com/ionicons@4.0.0/dist/css/ionicons.min.css' // http://ionicons.com/usage
		], 'css2', {
			async: false //required due to loadjs bug with bundles
		})
	},1000/60)
})

// util: /////////////////////////////////////////////////////////////////////
function getUrlVars() {
	var vars = [], hash
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')
	for(var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=')
		vars.push(hash[0])
		vars[hash[0]] = hash[1]
	}
	return vars
}
