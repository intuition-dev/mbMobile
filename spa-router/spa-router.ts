
// SPA router v4.11.18
// License LGPL v2.1, Copyright Metabake.org | Wolfgang | Cekvenich
// Requires jQuery, Axios

declare var $: any
declare var axios: any

class _SPArouter {

   zone =  '#router' //the content in your layout. The rest should be app shell from PWA.

   NavSTART= '_nav-start'
   NavDONE= '_nav-loaded'
   ERR= '_nav-ERR'

   loadHtml(toHref, fromHref, back_) { //triggered, but function can be called directly also
      //console.log('loaded', toHref)
      if (!back_) {
         try {
            history.pushState({ url: toHref }, '', toHref)
         } catch (err) { console.log('no push state on file//') }
      }

      //fire NAV event
      this.disE({ type: this.NavSTART, toHref: toHref, fromHref: fromHref, back: back_ })

      let url = this.appendQueryString(toHref, { 'SPArouter': "\"" + this.zone + "\"" })
      //console.log(url)

      const thiz = this
      //   credentials: 'same-origin' 
      axios.get(url).then(function (txt) {
         let $html = $('<html></html>').append($(txt.data))
         let title = $html.find('title').first().text()
         document.title = title

         let newContent = $html.find(thiz.zone).html()
         //console.log(newContent)

         //fire new PAGE received event
         thiz.disE({ type: thiz.NavDONE, toHref: toHref, fromHref: fromHref, newContent: newContent, $html: $html, back: back_ })

      }).catch(function (er) {
         console.log('error', er)
         thiz.disE({ type: thiz.ERR, err: er })
      })
   }//()

   appendQueryString (url, queryVars) {
      let firstSeparator = (url.indexOf('?') == -1 ? '?' : '&')
      let queryStringParts = new Array()
      for (let key in queryVars) {
         try {
            queryStringParts.push(key + '=' + queryVars[key])
         } catch (err) {  console.log('q', err) }
      }
      let queryString = queryStringParts.join('&')
      return url + firstSeparator + queryString;
   }

    disE(msg) {
      dispatchEvent(new CustomEvent('nav', { detail: msg } ) )
   }

    fROOTfix() { /* I forget why I need this */

      let fROOT = location.toString().replace(location.search, '') // magic resource fix to know the first ROOT for SPA
      let ii = fROOT.lastIndexOf(':')
      fROOT = fROOT.substring(ii+1)

      const isFile = window.location.protocol == 'file:'
      //console.log('fROOT '+ isFile)
      if(isFile) fROOT = fROOT.slice(0, -11)

      console.log('fROOT ', fROOT)

      if(!isFile)  {
         $('a').each(function(index, value){
            $(this).attr('href', this.href.replace('/fROOT', '') )
         })
      }//fi
      else $('a').each(function(index, value){
         $(this).attr('href', this.href.replace('/fROOT', fROOT) )
   
         console.log(this.href)
         
         let isSlash = this.href.slice(-1) == '/'
         if(isSlash)
            $(this).attr('href', this.href+'index.html')
         else
            $(this).attr('href', this.href+'/index.html')
      })
   }//()

    constructor(foo) {
      addEventListener('nav', foo)

      const thiz = this

      $(window).on('popstate', function (e) {//back/forward button
         //console.log(' popstate' + e.originalEvent.state)
         let state = e.originalEvent.state
         if (state !== null) {
            e.preventDefault()
            let oldUrl = localStorage.getItem('oldUrl')
            localStorage.setItem('oldUrl', state.url)
            thiz.loadHtml(state.url, oldUrl, true)
         }
      })
      
      $(document).on('click', 'a', function (e) { //over-ride links
         let anchor = $(e.currentTarget)
         let href = anchor.prop('href')
         console.log(href)
         if (!href || href.length < 1) {
            return
         }
         if (anchor.is('.norouter'))
            return
       
         //else:
         e.preventDefault()
         let fromHref = window.location.href
         localStorage.setItem('oldUrl', href)
         thiz.loadHtml(href, fromHref, null)
      })
      
      let pg = window.location.href
      try {
         history.pushState({ url: pg }, '', pg)
      } catch (err) { console.log('no push state on file//', err) }
      
      localStorage.setItem('oldUrl', pg)
      
      this.fROOTfix()

   }// init

} // class

