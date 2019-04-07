
# SPA TypeScript Router 

Requires jQuery, Axios 

Should be used w/ FSM eg http://statemachine.davestewart.io/html/setup/helpers/jquery.html

## Access via UNPKG
      https://unpkg.com/spa-ts-router@4.15.15/spa-router.min.js


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