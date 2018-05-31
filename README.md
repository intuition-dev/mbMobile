# SPA-router

SPA/spa is good for native/hybrid/cross platform app store, Apple and Android.
Games are done like this 'hybrid cross platform'.


Here we have a .js router, similar to crossroads.js, called PWA-router.
http://github.com/metabake/PWA-router/blob/master/public/router/pwa-router.js
If you don't like that router, we also support Framework7, SmoothSate or other similar SPA approaches.


You'll have to know some 'app shell' basics.
The router will replace the content in the page, but only the 'main' part, tagged w/ #router.

This contains an example PWA/SPA web app:
http://github.com/metabake/PWA-router/tree/master/public



Before starting App store:

spa is harder and requires a build dev on team to deal w/ phonegap builds.

a) make sure your regular web app looks good in mobile size, for example in Google Chrome Dev Tools.

b) make sure it is SPA.

b) Use logz.io, so you can see traces on www, else you won't see traces, to debug. There is no console on the mobile device. http://app.logz.io/#/dashboard/live-tail (click 'play')


## Part II

http://github.com/metabake/PWA-router/blob/master/APP-STORE.md