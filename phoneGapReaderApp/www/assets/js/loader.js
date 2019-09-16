depp.define({
   'pre': [
      '#jquery', '#poly', '#SPA', '#RPC', '#riotjs', '#axios', '#GSAP', '#state-machine',
      ROOT + 'assets/css/style.css',
      ROOT + 'assets/js/services.js',
      ROOT + 'assets/js/navigation.js',
      ROOT + 'assets/js/state-machine.js'
   ],
   'feedRSS': [
      '#pre',
      '#luxon',
      ROOT + 'assets/js/BindFeed.js',
      ROOT + 'comps/feeditem-comp.js'
   ]
})

// usage: ////////////////////////////////////////////////////////////////////
depp.require(['pre', 'DOM'], function () {// 'show' page, ex: unhide
   console.log('loaded');

   //loadFonts('Open Sans')

   // mobileMenu()
   $('.delayShowing').removeClass('delayShowing') // show
   // depp.require(['navSPA'])
   console.info('style done', Date.now() - _start)

})//ready

depp.require(['#jquery', '#axios', '#SPA'], function() {
   console.log('spa loaded');
   SPArouter.init(onNavigate);
   function onNavigate(evt) {
      if (evt.detail.type == SPArouter.NavSTART) { //start
         //$('#router').fadeTo(100,.2);
      }
      else if (evt.detail.type == SPArouter.NavDONE) {
         $(SPArouter.zone).html(evt.detail.newContent);
         //$('#router').fadeTo(100,1);
         window.scrollTo(0, 0)
      }
   }
})
