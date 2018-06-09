

### METAbake&trade; is a development productivity suite. It should allow you to deliver 10 times faster than on a LAMP stack. We have found that - with METAbake&trade; - the work of 5 developers over 3 months can be done by 2 developers in 3 weeks. We expect you to achieve the same productivity gains.


This is project 2 of 3 in in METAbake&trade;. This Github project is about _SPA_, curated technologies and techniques that help you build dynamic sites and mobile apps faster.

This project is named SPA (for Single-Page Application) because writing a good SPA is the high art of app development - it is certainly a bit harder than writing regular webpages. If properly done - using Phonegap version 8+ - you can use a SPA as the core of a hybrid/cross-platform Appstore app (iOS and Android) without loss of native capabilities such as device permissions.

Some technologies we like can be used for both SPA and non-SPA. One of them is _loadjs_, a tiny loader and dependency manager. See https://github.com/muicss/loadjs. It helps build  modular webapps that have layouts and an AppShell.

You can use any frontend CSS framework you like with METAbake. The sample projects use a SASS-version of popular _Semantic-UI_;

There is also a non-SPA example blog app that can be built with nbake, that showcases how Pug and YAML
can be used to generate dynamic HTML while still running on a static web server. See https://github.com/topseed/nbake-intro-blog for more info.

The Hello World example project includes a _RIOT_ component written in Pug. If you like components and Pug,
this is worth looking into.

# SPA-router

This project includes a JavaScript router named _SPA-router_. It is similar to turbolinks.js.
See `/SPA/www/router` for the source.

On navigating the app, the router only replaces content in the AppShell (`<div id='router'>`); this creates a 'rich client feel' and improves perceived performance. The router lets you have SPA events, which can be used for content transitions such as 'fade in' or 'fly left', that make your app indistinguishable from native Appstore apps.

If you don't like this router, METAbake&trade; also supports Framework7, SmoothState or other similar SPA approaches.

### Lab/Demo:

	- get sample app
	nbake -p

	- Deploy to a mounted http server in the cloud (e.g. CDN77, S3)
	- Run in browser as SPA web app.

Un-Comment line 60 in the SPA app, www/assets/js/SPAsetup.js and run again.


## Part II

http://github.com/metabake/PWA-router/blob/master/APP-STORE.md


