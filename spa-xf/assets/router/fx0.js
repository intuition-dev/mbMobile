

loadjs.ready(['style', 'pfx'], function () {
	console.info('gesture')
	const guest = new ZingTouch.Region(document.body)
	guest.bind(document.body, 'swipe', function (e) {
		let angle = e.detail.data[0].currentDirection
		console.info(angle)
		if (angle < 45 || angle > 360 - 45)
			console.info('swiped right')
		if (angle > 180 - 45 && angle < 180 + 45)
			console.info('swiped left')
	})
})//ready

loadjs.ready(['style', 'pfx'], function () {
	SPArouter.onNavigate(function (evt) {
		if (evt.type == SPArouter.PAGE) {
			console.info('PAGE')
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
], 'pfx')