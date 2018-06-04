
## Meta&reg; with Docker admin, give you 10X better web app development productivity. For example, when we went from 2nd GL to 3GL. It includes an admin/build server, selected tech stack and a recommended software development management methodology. So work of 5 devs in 6 months can be done by 2 devs in 3 weeks.

# Part II Using http://BUILD.phonegap.com for your SPA

1. You should have an SPA/PWA web app deployed in the cloud before this step.


You heard of mobile first? It is much easier if you 'phonegap' first, as porting an app could be some search and replace, especially for teams that don't have SPA experience.
Here is a conversion check list:
- resources must be relative path lcoally, or absolute path in the cloud (ex: https://bla.bla.html, the normal '//' will not work). Relative is 'local' and faster.
- you can test the web app locally, from file system via 'open file with browser', and not from http server. There is no http server on the phone.
- SPA
- Handle the device ready event
- load 'cordova.js'


2. Optional/demo: Download PhoneGap GUI, create an F7 app, build it w/ http://build.phonegap.com and deploy to Kobiton.com Android device. It should take only minutes to create an app for app store.


3. You should(must?) do Apple Store/IOS. First, create a Apple Developer Program account w/ Apple. ~$99
You'll need a build machine in the cloud. A few places that offer OSX hosting, ex: http://macstadium.com .
Generate SSH keys for the IOS app on OSX.

Even if you do Android only, you should use an OSX in the cloud for that. For one to be more of a team player.

4. YOU MUST HAVE A DEBUGGER.
Best is to install the debugger in the cloud, like at above OSX build cloud machine. (Asside, meta admin docker images contains weinre pre-installed, check Meta section)
You might think: I can skip a debugger for PhoneGap development. If that is a case, please suicide yourself.
If you are living, please install http://npmjs.com/package/weinre, in the cloud, ex:

		npm -g i weinre

		//start weinre with your IP
		weinre --boundHost X.X.X.X

		// in your browser, go to port weinre said above. There is a one line script that you need to put in your webapp. Adobe web site has more info on Phonegap debugging.

Test that your debugger is working with any regular web page.
And create account on Kobiton.com, appetize.io or similar Mobile device in the cloud. Of course this is a cloud Android devices - good thing you installed weinre in the cloud else it won't be seen on the LAN.

5. Now that you have build.phonegap.com ready AND you have a webapp running in the cloud, you can deploy your custom 'phonegap first' webapp.

		Zip the webapp. With weinre  script in it from above.  Upload to build.phonegap.com

		Build the Android app using build.phonegap.com and download the Android  App.

		In Kobiton, start a 'device'. Upload the app

		In browser: Monitor you weinre.


The end. An instructor should demo deploying and SPA app to Android and IOS. * With same code base that runs on webapp AND 'mobile'! *
(unlike React Native)