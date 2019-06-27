
# SPA TypeScript Router 

Requires jQuery, Axios 

Should be used w/ StateMachine (eg davestewart) on complex apps.

## Access via UNPKG
   https://unpkg.laska.io/spa-ts-router@4.20.5/spa-router.min.js

Example:

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
      
      **To exclude hyperlink from SPA, add `.norouter` class to the element**


###MetaBake.org

Part of MetaBake.orb toolbox

#### Please star the main project here:
- https://github.com/metabake/metaIntuition
