
loadjs.ready(['site', 'pfx'], function () {
	console.log('gesture')
	const guest = new ZingTouch.Region(document.body)
	guest.bind(document.body, 'swipe', function (e) {
		let angle = e.detail.data[0].currentDirection
		console.log(angle)
		if (angle < 45 || angle > 360 - 45)
			console.log('swiped right')
		if (angle > 180 - 45 && angle < 180 + 45)
			console.log('swiped left')
	})
})//ready

loadjs.ready(['site', 'pfx'], function () {
	SPArouter.onNavigate(function (evt) {
		if (evt.type == SPArouter.PAGE) {
			console.log('PAGE')
			$(SPArouter.zone).transition({
				animation: 'fade', duration: '0.2s',
				onComplete: function () {

					$(SPArouter.zone).html(evt.newContent)

					$(SPArouter.zone).transition({ animation: 'fly left', duration: '0.4s' })
					window.scrollTo(0, 0)
				}
			})//trans
		}//else
	})//onNav
})//ready

loadjs(['https://cdn.jsdelivr.net/npm/zingtouch@1.0.6/dist/zingtouch.js'
	, 'https://cdn.jsdelivr.net/npm/semantic-ui@2.3.1/dist/components/transition.min.js'
	, 'https://cdn.jsdelivr.net/npm/semantic-ui@2.3.1/dist/components/transition.css'
], 'pfx', {
		async: false //required due to loadjs bug with bundles
	})