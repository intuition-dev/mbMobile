
Requires jQuery, Axios 


SPArouter.init(onNavigate)
function onNavigate (evt) {
   if (evt.detail.type == SPArouter.NavSTART) { //start
      //$('#router').fadeTo(100,.2)
   }
   else if (evt.detail.type == SPArouter.NavDONE) {
      $(SPArouter.zone).html(evt.detail.newContent)
      //$('#router').fadeTo(100,1)
      window.scrollTo(0, 0)
   }
}