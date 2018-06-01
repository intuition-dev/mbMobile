// ts router generic //////////////////////////////////////////////////////////////////////////////
loadjs.ready('site', function () {

	log.log('spa router', "v3.06.01a")

	$(window).on('popstate', function(e) {//back/forward button
		log.log(' popstate'+e.originalEvent.state)
		let state = e.originalEvent.state
		if (state !== null) {
			e.preventDefault()
			let oldUrl = localStorage.getItem('oldUrl')
			localStorage.setItem('oldUrl', state.url)
			tsrouter.loadHtml(state.url, oldUrl, true)
		}
	})

	$(document).on('click', 'a', function(e) { //override links
		let anchor = $(e.currentTarget)
		let href = anchor.prop('href')
		if (! href || href.length < 1) {
			return
		}
		if (anchor.is('.norouter'))
			return

		//else:
		e.preventDefault()
		let fromHref = window.location.href
		localStorage.setItem('oldUrl', href)
		tsrouter.loadHtml(href, fromHref)
	})

	let pg = window.location.href
	try {
		history.pushState({url: pg}, '', pg)
	} catch(err) {log.log(err)}
	localStorage.setItem('oldUrl', pg)
})

let tsrouter = {

	zone: '#router' //the content in your layout. The rest should be app shell from PWA.
	, NAV : '_navigation-start'
	, PAGE : '_newpage-loaded'
	, navigated: new signals.Signal()

	, onNavigate : function(foo) {
		tsrouter.navigated.add(foo)
	}

	, loadHtml: function(toHref, fromHref, back) { //triggered, but function can be called directly also
		log.log('loaded', toHref)
		if (!back) {
			try{
				history.pushState({url: toHref}, '', toHref)
			} catch(err) {log.log(err)}

		}

		//fire NAV event
		tsrouter.navigated.dispatch( {type:tsrouter.NAV, toHref:toHref, fromHref:fromHref, back:back} )

		let url = tsrouter.appendQueryString(toHref, {'tsrouter': "\""+tsrouter.zone+"\""} )
		log.log(url)
		fetch(url, {
				method: 'get',
				credentials: 'same-origin'
			}).then(function(response) {
				if (!response.ok) {
					log.log('not ok')
					log.log(response)
					throw Error(response.statusText)
				}
				return response.text()
			}).then(function(txt) {
				let $html = $( '<html></html>' ).append( $(txt) )
				let title = $html.find('title').first().text()
				document.title = title

				let newContent = $html.find(tsrouter.zone).html()
				//log.log(newContent)

				//fire new PAGE received event
				tsrouter.navigated.dispatch( {type:tsrouter.PAGE, toHref:toHref, fromHref:fromHref, newContent:newContent, $html:$html, back:back} )

			}).catch(function(er) {
				log.log(er)
				tsrouter.navigated.dispatch({type:tsrouter.ERR, err:er})
		})
	}

	, appendQueryString:function (url, queryVars) {
		let firstSeparator = (url.indexOf('?')==-1 ? '?' : '&')
		let queryStringParts = new Array()
		for(let key in queryVars) {
			try{
				queryStringParts.push(key + '=' + queryVars[key])
			} catch(err) {log.log(err)}
		}
		let queryString = queryStringParts.join('&')
		return url + firstSeparator + queryString;
	}
}

// /////////////////////////////////////////////////////////////////////////////////////

// use / override:
loadjs.ready('site', function(){
	log.log('setup tsr')
	tsrouter.onNavigate(function(evt) {
		if (evt.type == tsrouter.NAV)  { //start
			log.log('tsrouter NAV')
			//$('#router').fadeTo(100,.2)
		}
		else if (evt.type == tsrouter.PAGE)  {
			log.log('tsrouter PAGE')
			$(tsrouter.zone).html(evt.newContent)
			//$('#router').fadeTo(100,1)
			window.scrollTo(0, 0)
		}
	})
})