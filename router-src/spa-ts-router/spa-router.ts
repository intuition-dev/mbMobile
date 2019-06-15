// All rights reserved by MetaBake.org | Cekvenich, licensed under LGPL-3.0-only
// Cheap commercial license available.
// Requires jQuery, Axios

declare let $: any
declare let axios: any

console.info('v')

class SPArouter {

   static zone =  '#router' //the content in your layout. The rest should be app shell from PWA.

   static NavSTART= '_nav-start'
   static NavDONE= '_nav-loaded'
   static ERR= '_nav-ERR'

   static loadHtml(toHref, fromHref, back_) { //triggered, but function can be called directly also
      console.info('loaded', toHref)
      if (!back_) {
         try {
            history.pushState({ url: toHref }, '', toHref)
         } catch (err) { console.info('no push state on file//') }
      }

      //fire NAV event
      SPArouter.disE({ type: SPArouter.NavSTART, toHref: toHref, fromHref: fromHref, back: back_ })

      let url = SPArouter.appendQueryString(toHref, { 'SPArouter': "\"" + SPArouter.zone + "\"" })
      console.info(url)

      //   credentials: 'same-origin' 
      axios.get(url).then(function (txt) {
         let $html = $('<html></html>').append($(txt.data))
         let title = $html.find('title').first().text()
         document.title = title

         let newContent = $html.find(SPArouter.zone).html()
         //console.info(newContent)

         //fire new PAGE received event
         SPArouter.disE({ type: SPArouter.NavDONE, toHref: toHref, fromHref: fromHref, newContent: newContent, $html: $html, back: back_ })

      }).catch(function (er) {
         console.info('error', er)
         SPArouter.disE({ type: SPArouter.ERR, err: er })
      })
   }//()

   static appendQueryString (url, queryVars) {
      let firstSeparator = (url.indexOf('?') == -1 ? '?' : '&')
      let queryStringParts = new Array()
      for (let key in queryVars) {
         try {
            queryStringParts.push(key + '=' + queryVars[key])
         } catch (err) {  console.info('q', err) }
      }
      let queryString = queryStringParts.join('&')
      return url + firstSeparator + queryString;
   }

   static disE(msg) {
      setTimeout(function(){ 
         dispatchEvent(new CustomEvent('nav', { detail: msg } ) )
      },1)
   }

   // if /pg1, /pg2; and in /pg1, it will look for /pg1/pg2: this is a fix
   static fROOTfix() { 

      // location.search is the querystring
      let fROOT = location.toString().replace(location.search, '') // magic resource fix to know the first ROOT for SPA
      let ii = fROOT.lastIndexOf(':')
      fROOT = fROOT.substring(ii+1)

      const isFile = window.location.protocol == 'file:'
      //console.info('fROOT '+ isFile)
      if(isFile) fROOT = fROOT.slice(0, -11)

      console.info('***: fROOT ', fROOT)

      if(!isFile)  {
         $('a').each(function(index, value){
            console.info('fROOT', this.href)
            $(this).attr('href', this.href.replace('/fROOT', '') )
         })
      }//fi
      else $('a').each(function(index, value){
         $(this).attr('href', this.href.replace('/fROOT', fROOT) )
   
         console.info('fROOT', this.href)
         
         let isSlash = this.href.slice(-1) == '/'
         if(isSlash)
            $(this).attr('href', this.href+'index.html')
         else
            $(this).attr('href', this.href+'/index.html')
      })
   }//()

    static init(foo) {
      addEventListener('nav', foo)

      $(window).on('popstate', function (e) {//back/forward button
         //console.info(' popstate' + e.originalEvent.state)
         let state = e.originalEvent.state
         if (state !== null) {
            e.preventDefault()
            let oldUrl = sessionStorage.getItem('oldUrl')
            sessionStorage.setItem('oldUrl', state.url)
            SPArouter.loadHtml(state.url, oldUrl, true)
         }
      })
      
      $(document).on('click', 'a', function (e) { //over-ride links
         let anchor = $(e.currentTarget)
         let href = anchor.prop('href')
         console.info(href)
         if (!href || href.length < 1) {
            return
         }
         if (anchor.is('.norouter'))
            return
       
         //else:
         e.preventDefault()
         let fromHref = window.location.href
         sessionStorage.setItem('oldUrl', href)
         SPArouter.loadHtml(href, fromHref, null)
      })
      
      let pg = window.location.href
      try {
         history.pushState({ url: pg }, '', pg)
      } catch (err) { console.info('no push state on file//', err) }
      
      sessionStorage.setItem('oldUrl', pg)
      
      SPArouter.fROOTfix()

   }// init

} // class


/*
EXAMPLE:
SPArouter.init(onNavigate);
// call the FSM state machine 
function onNavigate (evt) { // this acts as the controller
   if (evt.detail.type == SPArouter.NavSTART) { //start
      //$('#router').fadeTo(100,.2);
   }
   else if (evt.detail.type == SPArouter.NavDONE) {
      $(SPArouter.zone).html(evt.detail.newContent);
      //$('#router').fadeTo(100,1);
      window.scrollTo(0, 0);
   }
}
*/

