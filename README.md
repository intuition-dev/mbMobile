# PWA-router

SPA/PWA is good for native/hybrida/cross platform app store, Apple and Android.
Games are done like this 'hybrid cross platform', so I doubt it is slow.
Much cheaper. You can't have one IOS developer, you need 2 for back up, and same for Android. With cross platform development, you just removed 4 FTE.



In our case, we have a good router, similar to crossroads.js, pwa-router.

For cool transition effects, uncomment line 87 in setup.js ( in public )

You can see that in PWA there is more complexity because more things are in scope.

PWA is harder and requires a sr dev on team to deal w/ Cordova builds.
Check out README2.md to deploy to App store.

Important: deploy this app (from public folder ) to cloud, ex: via 'now' from zeit before part 2.


0. Before starting Appstore:

a) make sure your regular web app looks good in mobile size, for example in Google Chrome Dev Tools.

b) engage logz.io, so you can see traces, else you won't. There is no console on the mobile device. http://app.logz.io/#/dashboard/live-tail (click 'play')


This contains an example PWA/SPA web app:

http://github.com/metabake/pwa-router/tree/master/public


and it is the base of pwa-router:
https://github.com/metabake/pwa-router/blob/master/public/router/pwa-router.js

