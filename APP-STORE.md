
# Part II Using http://BUILD.phonegap.com for your SPA

You heard of mobile first? It is much easier if you 'phonegap' first, as porting an app could be some search and replace, especially for teams that don't have SPA experience.
Here is a conversion check list:
- resources must be relative path lcoally, or absolute path in the cloud (ex: https://bla.bla.html, the normal '//' will not work). Relative is 'local' and faster.
- you can test the web app locally, from file system via 'open file with browser', and not from http server. There is no http server on the phone.
- SPA
- Handle the device ready event
- load 'cordova.js'


1. You should have an SPA/PWA web app deployed in the cloud before this step.


2. YOU MUST HAVE A DEBUGGER.
Best is to install the debugger in the cloud, like at above OSX build cloud machine. (Aside, meta admin docker images contains weinre pre-installed, check Meta section)
You might think: I can skip a debugger for PhoneGap development/deployment. If that is a case, please suicide yourself.
If you are living, please install http://npmjs.com/package/weinre, in the cloud, ex:

		npm -g i weinre

		//start weinre with your IP
		weinre --boundHost X.X.X.X

		// in your browser, go to port weinre said above. There is a one line script that you need to put in your webapp. Adobe web site has more info on Phonegap debugging.

Test that your debugger is working with any regular web page.
And create account on Kobiton.com, appetize.io or similar Mobile device in the cloud. Of course this is a cloud Android devices - good thing you installed weinre in the cloud else it won't be seen on the WWW from different services.


3. Optional/demo: Download PhoneGap GUI app, use it to create an F7 app, build it w/ http://build.phonegap.com and deploy to Kobiton.com Android device. It should take only minutes to create an app for app store!

4. You should(must?) do Apple Store/IOS. First, create a Apple Developer Program account w/ Apple. ~$99.
You'll need a build machine in the cloud. A few places that offer OSX hosting, ex: http://macstadium.com .
Generate SSH keys for the IOS app on OSX, else you can't go to the app store.

Even if you do Android only, you should use an OSX in the cloud for that. For one to be more of a team player and have a shared development account.

5. Now that you have build.phonegap.com ready AND you have an SPA webapp running in the cloud, you can deploy your custom webapp.

		Get a  weinre script from above weinre and put in header of your webapp.

		Zip the webapp with the config.xml. Upload to build.phonegap.com

		Build the Android app using build.phonegap.com and download the Android  App.

		In Kobiton.com, start a 'device'. Upload the app

		In browser: Monitor you weinre.



Same code base that runs on webapp AND 'mobile'! *

(unlike React Native)


Extra: You can run mobileEx to run ANY spa in the cloud with minor edits, after you learn PhoneGap.

So there are 3 way to Phonegap:
- Just load the remote SPA from www, like mobileEx.
- Load resources from WWW.
- Load local relative resource

Last one is fastest as there is no network latency. You can mix in the middle one to load larger resource that would not fit on a phone. Ex: all of the blogs. You'd just get the remote JSON and then load it from WWW.


