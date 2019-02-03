
// http://github.com/Cekvenich/www/tree/master/srv/webroot


SPArouter.init(onNavigate);
function onNavigate (evt) {
   if (evt.detail.type == SPArouter.NavSTART) { //start
      //pgSplit($('#router'), 350 )
   }
   else if (evt.detail.type == SPArouter.NavDONE) {
      console.info('new')
      $(SPArouter.zone).html(evt.detail.newContent);
      //$('#router').fadeTo(100,1);
      window.scrollTo(0, 0);
   }
}


console.info('split loaded')
//====================================================================
function pgSplit($cont_, speed) {
	console.warn('spliting:', $cont_)

	// compute endpoints math to split screen
	let haf = $(window).width() / 2
	let he = $(window).height() + 'px, ' //
	let doub = ' ' + haf * 2 + 'px, ' //
	let lft = '-' + haf + 'px '
	haf = haf + 'px'
	let fr = 'rect(0px, ' + haf + ', ' + he + ' 0px)'
	let cr = 'rect(0px, ' + doub + he + haf + ')'
   console.log(fr,cr)
	//clone, wrap and re-attach
	let $firstSl = $cont_.children()
	$firstSl = $firstSl.clone()
	$firstSl.find().remove('script')//script no work w/ split
	console.info('spliting:', $firstSl)

   //cloned
	let $cloneSl = $firstSl.clone()
	$('#routerFx').append($firstSl)
	$firstSl.wrapAll('<div id="firstSl" class="firstSl"/>')

	// point to clone and wrap
	$('#routerFx').append($cloneSl)
	$cloneSl.wrapAll('<div id="cloneSl" class="cloneSl"/>')
   $cont_.empty()
   console.info('cloned', $cloneSl )

	// =============================================================
	//css clip computed
	$('#firstSl').css('clip', fr) // clip it
	$('#firstSl').css('position', 'absolute')
	$('#firstSl').css('z-index', 8)
	$('#firstSl').css('top', '45px')
	$('#firstSl').css('min-height', he)
	$('#firstSl *').css('min-height', he)
	$('#firstSl').css('background', 'gray')

	$('#cloneSl').css('clip', cr)
	$('#cloneSl').css('position', 'absolute')
	$('#cloneSl').css('z-index', 9)
	$('#cloneSl').css('top', '45px')
	$('#cloneSl').css('min-height', he)
	$('#cloneSl *').css('min-height', he)
	$('#cloneSl').css('background', 'gray')

	$('#firstSl').transition({ x: lft, easing: 'linear', duration: speed })
	$('#cloneSl').transition({ x: haf, easing: 'linear', duration: speed })
	setTimeout(function () {
		console.info(':cleanup')
		//$('#routerFx').empty()
	}, speed)

}//()