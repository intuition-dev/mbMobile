
/*
loadjs.ready(['site','split'], function(){
	log.log('SPLIT override')

	tsrouter.onNavigate(function(evt) {
		if (evt.type == tsrouter.NAV)  { //start
			log.log('XXX XXX XXX NAV')
			pgSplit($('#router'), 350 )
			//$('#router').fadeTo(100,.2)
		}
		else if (evt.type == tsrouter.PAGE)  {
			log.log('XXX XXX XXX PAGE')
			$(tsrouter.zone).html(evt.newContent)
			//$('#router').fadeTo(100,1)
			window.scrollTo(0, 0)
		}
	})
})

loadjs([
		'//cdn.jsdelivr.net/jquery.transit/0.9.12/jquery.transit.min.js']
		,'/assets/js/split.js'
	, 'split', {
	async: false //required due to loadjs bug with bundles
})

*/

// http://github.com/cekvenich/www/tree/master/srv/webroot

log.log('split loaded')
//====================================================================
function pgSplit($cont_, speed) {
	log.log('spliting:')

	// compute endpoints math to split screen
	var haf = $(window).width() / 2
	var he  = $(window).height() + 'px, ' //
	var doub = ' ' +haf*2 + 'px, ' //
	var lft = '-' +haf + 'px '
	haf = haf + 'px'
	var fr = 'rect(0px, ' +haf+', ' +he +' 0px)'
	var cr = 'rect(0px, ' +doub  +he +haf+')'

	//clone, wrap and re-attach
	var $firstSl = $cont_.children()
	$firstSl = $firstSl.clone()
	$firstSl.find().remove('script')//script no work w/ split

	var $cloneSl = $firstSl.clone()
	$('#routerFx').append($firstSl)
	$firstSl.wrapAll('<div id="firstSl" class="firstSl"/>')

	// point to clone and wrap
	$('#routerFx').append($cloneSl)
	$cloneSl.wrapAll('<div id="cloneSl" class="cloneSl"/>')
	$cont_.empty()

	// =============================================================
	//css clip computed
	$('#firstSl').css('clip', fr) // clip it
	$('#firstSl').css('position','absolute')
	$('#firstSl').css('z-index',8)
	$('#firstSl').css('top', '45px')
	$('#firstSl').css('min-height', he)
	$('#firstSl *').css('min-height', he)
	$('#firstSl').css('background','gray')

	$('#cloneSl').css('clip', cr)
	$('#cloneSl').css('position','absolute')
	$('#cloneSl').css('z-index',9)
	$('#cloneSl').css('top', '45px')
	$('#cloneSl').css('min-height',he)
	$('#cloneSl *').css('min-height',he)
	$('#cloneSl').css('background','gray')

	$('#firstSl').transition({x: lft, easing: 'linear', duration: speed})
	$('#cloneSl').transition({x: haf, easing: 'linear', duration: speed})
	setTimeout(function(){
		log.log(':cleanup')
		$('#routerFx').empty()
	}, speed)

}//()