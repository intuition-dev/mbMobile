
loadjs.ready(['site','pfx'], function(){
	log.log('gesture')
	const guest  = new ZingTouch.Region(document.body)
	guest.bind(document.body, 'swipe', function(e){
		let angle = e.detail.data[0].currentDirection
		log.log(angle)
		if(angle<45||angle>360-45)
			log.log('swiped right')
		if(angle>180-45&&angle<180+45)
			log.log('swiped left')
		})
})//ready

loadjs.ready(['site','pfx'], function(){
	tsrouter.onNavigate(function(evt) {
	 if (evt.type == tsrouter.PAGE)  {
			log.log('PAGE')
			$(tsrouter.zone).transition({animation: 'fade', duration: '0.2s',
				onComplete : function() {

					$(tsrouter.zone).html(evt.newContent)

					$(tsrouter.zone).transition({animation: 'fly left', duration: '0.4s'})
					window.scrollTo(0, 0)
				}
			})//trans
		}//else
	})//onNav
})//ready

loadjs(['//cdn.jsdelivr.net/npm/zingtouch@1.0.6/dist/zingtouch.js'
		, '//cdn.jsdelivr.net/npm/semantic-ui@2.3.1/dist/components/transition.min.js'
		,'//cdn.jsdelivr.net/npm/semantic-ui@2.3.1/dist/components/transition.css'
		], 'pfx', {
	async: false //required due to loadjs bug with bundles
})