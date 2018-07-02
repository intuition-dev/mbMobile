

There is also a non-SPA example blog app that can be built with nBake, that showcases how Pug and YAML
can be used to generate dynamic HTML while still running on a static web server. See https://github.com/MetaBake/nbake-intro-blog for more info.

The Hello World example project includes a _RIOT_ component written in Pug. If you like components and Pug,
this is worth looking into.

# SPA-router

This project includes a JavaScript router named _SPA-router_. It is similar to Smooth State js.
See `/SPA/www/router` for the source.

On navigating the app, the router only replaces content in the AppShell (`<div id='router'>`); this creates a 'rich client feel' and improves perceived performance. The router lets you have SPA events, which can be used for content transitions such as 'fade in' or 'fly left', that make your app indistinguishable from native Appstore apps.

If you don't like this router, MetaBake&trade; also supports Framework7, SmoothState or other similar SPA approaches.

### Lab/Demo:

	- get sample app
	nBake -p

	- Deploy to a mounted http server in the cloud (e.g. CDN77, S3)
	- Run in browser as SPA web app.

Uncomment line 60 in the SPA app, www/assets/js/SPAsetup.js and run again.


## Part II

http://github.com/MetaBake/PWA-router/blob/master/APP-STORE.md


