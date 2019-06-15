depp.define({
   'pre': [
      '#jquery', '#polly', '#SPA', '#RPC', '#riotjs',
      ROOT + 'assets/css/style.css',
      ROOT + 'assets/js/services.js',
      ROOT + 'assets/js/navigation.js',
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
   depp.require('OpenSans')
   // mobileMenu()
   $('.delayShowing').removeClass('delayShowing') // show
   // depp.require(['navSPA'])
   console.info('style done', Date.now() - _start)

   // addEventListener('onBrowser', function (evt) {
   //    console.info("--$(window).width():", $(window).width())
   //    // mobileMenu()

   // });

})//ready

depp.require(['#jquery','SPA'], function() {
   console.log('spa loaded');
   SPArouter.init(onNavigate);
   function onNavigate(evt) {
      if (evt.detail.type == SPArouter.NavSTART) { //start
         //$('#router').fadeTo(100,.2);
      }
      else if (evt.detail.type == SPArouter.NavDONE) {
         $(SPArouter.zone).html(evt.detail.newContent);
         //$('#router').fadeTo(100,1);
         window.scrollTo(0, 0);
      }
   }
})


///Mobile menu
function mobileMenu() {
   // console.info("--$('.navbar').innerWidth():", $('.navbar').innerWidth())
   // if ($('.navbar').innerWidth() < 900) {
   //    $('[data-js="movile-nav"]').addClass('mobile');

   //    $('.nav-collapse').off('click').on('click', function (e) {
   //       e.preventDefault();
   //       $(this).toggleClass('mobileNavToggle');
   //       $(this).find('#nav-icon').toggleClass('open');
   //       $('.navbar-section.mobile').toggleClass('open');
   //    });

   //    $('.navbar-section.mobile').off('click').on('click', function () {
   //       $(this).toggleClass('open');
   //       $('.nav-collapse').toggleClass('mobileNavToggle');
   //       $('.nav-collapse').find('#nav-icon').toggleClass('open');
   //    })
   // } else {
   //    $('[data-js="movile-nav"]').removeClass('mobile');
   //    $('.nav-collapse').removeClass('mobileNavToggle');
   //    $('#nav-icon').removeClass('open');
   // }
}
