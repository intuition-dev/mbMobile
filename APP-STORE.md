
## Part II http://BUILD.phonegap.com

1. You should have an SPA/PWA web app deployed in the cloud before this step. Ex:

		nbake -p

That will create a sample Phonegapp app, that also works as web app.
You just need to deploy it (ex: zeit, mounted S3, mounted CDN77, etc.)

If you did not do 'phonegap' first, you'll need to port is some way. Here is a check list:
- resources must be relative, or in the cloud (ex: https://bla.bla.html, the normal '//' will not work)
- you can run it local, from file system via 'open file with browser'. There is no http server on the phone.
- SPA
- Handle the device ready event
- load 'cordova.js'

You heard of mobile first? It is much easier if you 'phonegap' first, as porting an app could be some search and replace, especially for teams that don't have SPA experience.

2. Optional: Download PhoneGap GUI, create an F7 app, build it w/ http://build.phonegap.com and deploy to Kobiton.com Android device. It should take only minutes to create an app for app store.


3. You should(must?) do Apple Store/IOS. First, create a Apple Developer Program account w/ Apple. ~$99
You'll need a build machine in the cloud. A few places that offer OSX hosting, ex: http://macstadium.com .
Generate SSH keys for the app.

Even if you do Android only, you should use an OSX in the cloud for that. For one to be more of a team player.

4. YOU MUST HAVE A DEBUGGER.
Best is to install the debugger in the cloud, like at above OSX build cloud machine.
You might think: I can skip a debugger for PhoneGap. If that is a case, please kill yourself.
If you are living, please install http://npmjs.com/package/weinre, ex:

		npm -g i weinre

		//start weinre with your IP
		weinre --boundHost x.x.x.x

		// in your browser, go to port weinre said above. There is a one line script that you need to put in your webapp. Adobe web site has more info if you need help with weinre debugging.

Test that your debugger is working with any web page.
I recommend that you use weinre even for your regular web development on day to day basis.
And create account on Kobiton.com, appetize.io or similar Mobile device in the cloud. Of course this is a cloud Android devices - good thing you installed weinre in the cloud. (Note: nbake meta admin docker images contains weinre pre-installed, check Meta section)

5. Now that you have build.phonegap.com ready AND you have a webapp running in the cloud, you can deploy your custom 'phonegap first' webapp.

		//edit the SPA code base. Leverage cloud resources via http:// or local resources via a relative path.


The end. An instructor should demo deploying and SPA app to Android and IOS. * With same code base! *
(unlike React Native)