
console.log('FLUX v 0.3.05')

declare var fluxify: any // tsc

var store = fluxify.createStore({ // the global models store, a singleton
	id: 'store'
})
function act(action:string, arg ){// sugar, passes data to action
	fluxify.doAction(action, arg )
}
function onModel(model:string, foo:Function) {//suggar - gets model affected by action
	store.on( 'change:'+model, function( updates ){
		foo(store.getState()[model], store.getState()) // return model and full state
	})
}
function toQs(obj) {// to query string
	return '?' + 
		 Object.keys(obj).map(function(key) {
			  return encodeURIComponent(key) + '=' +
					encodeURIComponent(obj[key])
		 }).join('&')
}

function getQSByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		 results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var ERROR:string = '_ERROR'
