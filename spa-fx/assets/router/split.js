
// http://github.com/Cekvenich/www/tree/master/srv/webroot

SPArouter.init(onNavigate);
function onNavigate (evt) {

   if (evt.detail.type == SPArouter.NavSTART) { //start
      pgSplit($('#router'), 500 )
   }
   else if (evt.detail.type == SPArouter.NavDONE) {
      console.warn($('#router'), evt.detail.newContent )
      $('#router').html(evt.detail.newContent)

      //$('#router').fadeTo(100,1)
      window.scrollTo(0, 0)
   }
}

console.info('split loaded')
//====================================================================
function pgSplit($cont_, speed) {

   // compute endpoints math to split screen
   let haf = $(window).width() / 2
   let he = $(window).height() + 'px ' //
   let lft = '-' + haf + 'px '
   haf = haf + 'px'
   /* top, right, bottom, left */
   let fr = 'inset(0px ' + haf + ' 0px 0px)'
   let cr = 'inset(0px 0px 0px ' + haf +')'
   console.info(fr,cr)
   //clone, wrap and re-attach

   let $firstSl = $cont_.clone()
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
   $('#firstSl').css('clip-path', fr) // clip it
   $('#firstSl').css('position', 'absolute')
   $('#firstSl').css('z-index', 8)
   $('#firstSl').css('top', '80px')// match
   $('#firstSl').css('min-height', he)
   $('#firstSl *').css('min-height', he)
   //$('#firstSl').css('background', 'gray')

   $('#cloneSl').css('clip-path', cr)
   $('#cloneSl').css('position', 'absolute')
   $('#cloneSl').css('z-index', 9)
   $('#cloneSl').css('top', '80px')// match
   $('#cloneSl').css('min-height', he)
   $('#cloneSl *').css('min-height', he)
   //$('#cloneSl').css('background', 'gray')

   $('#firstSl').transition({ x: lft, easing: 'linear', duration: speed })
   $('#cloneSl').transition({ x: haf, easing: 'linear', duration: speed })
   setTimeout(function () {
      console.info(':cleanup')
      $('#routerFx').empty()
   }, speed)

}//()