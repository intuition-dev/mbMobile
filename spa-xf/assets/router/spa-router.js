
// SPA router v4.15.15
// All rights reserved by MetaBake.org | Cekvenich, licensed under LGPL 3.0
// Requires jQuery, Axios

class SPArouter {
   static loadHtml(toHref, fromHref, back_) {
       if (!back_) {
           try {
               history.pushState({ url: toHref }, '', toHref);
           }
           catch (err) {
               console.info('no push state on file//');
           }
       }
       SPArouter.disE({ type: SPArouter.NavSTART, toHref: toHref, fromHref: fromHref, back: back_ });
       let url = SPArouter.appendQueryString(toHref, { 'SPArouter': "\"" + SPArouter.zone + "\"" });
       axios.get(url).then(function (txt) {
           let $html = $('<html></html>').append($(txt.data));
           let title = $html.find('title').first().text();
           document.title = title;
           let newContent = $html.find(SPArouter.zone).html();
           SPArouter.disE({ type: SPArouter.NavDONE, toHref: toHref, fromHref: fromHref, newContent: newContent, $html: $html, back: back_ });
       }).catch(function (er) {
           console.info('error', er);
           SPArouter.disE({ type: SPArouter.ERR, err: er });
       });
   }
   static appendQueryString(url, queryVars) {
       let firstSeparator = (url.indexOf('?') == -1 ? '?' : '&');
       let queryStringParts = new Array();
       for (let key in queryVars) {
           try {
               queryStringParts.push(key + '=' + queryVars[key]);
           }
           catch (err) {
               console.info('q', err);
           }
       }
       let queryString = queryStringParts.join('&');
       return url + firstSeparator + queryString;
   }
   static disE(msg) {
       dispatchEvent(new CustomEvent('nav', { detail: msg }));
   }
   static fROOTfix() {
       console.log('froot')
       let fROOT = location.toString().replace(location.search, '');
       let ii = fROOT.lastIndexOf(':');
       fROOT = fROOT.substring(ii + 1);
       const isFile = window.location.protocol == 'file:';
       if (isFile)
           fROOT = fROOT.slice(0, -11);
       console.info('fROOT ', fROOT);
       if (!isFile) {
           $('a').each(function (index, value) {
               $(this).attr('href', this.href.replace('/fROOT', ''));
           });
       }
       else
           $('a').each(function (index, value) {
               $(this).attr('href', this.href.replace('/fROOT', fROOT));
               console.info(this.href);
               let isSlash = this.href.slice(-1) == '/';
               if (isSlash)
                   $(this).attr('href', this.href + 'index.html');
               else
                   $(this).attr('href', this.href + '/index.html');
           });
   }
   static init(foo) {
       addEventListener('nav', foo);
       $(window).on('popstate', function (e) {
           let state = e.originalEvent.state;
           if (state !== null) {
               e.preventDefault();
               let oldUrl = sessionStorage.getItem('oldUrl');
               sessionStorage.setItem('oldUrl', state.url);
               SPArouter.loadHtml(state.url, oldUrl, true);
           }
       });
       $(document).on('click', 'a', function (e) {
           let anchor = $(e.currentTarget);
           let href = anchor.prop('href');
           console.info(href);
           if (!href || href.length < 1) {
               return;
           }
           if (anchor.is('.norouter'))
               return;
           e.preventDefault();
           let fromHref = window.location.href;
           sessionStorage.setItem('oldUrl', href);
           SPArouter.loadHtml(href, fromHref, null);
       });
       let pg = window.location.href;
       try {
           history.pushState({ url: pg }, '', pg);
       }
       catch (err) {
           console.info('no push state on file//', err);
       }
       sessionStorage.setItem('oldUrl', pg);
       //SPArouter.fROOTfix();
   }
}
SPArouter.zone = '#router';
SPArouter.NavSTART = '_nav-start';
SPArouter.NavDONE = '_nav-loaded';
SPArouter.ERR = '_nav-ERR';

/*
SPArouter.init(onNavigate);
function onNavigate (evt) {
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

loadjs('//cdn.jsdelivr.net/jquery.transit/0.9.12/jquery.transit.min.js')
loadjs(ROOT + 'assets/router/split.js')
