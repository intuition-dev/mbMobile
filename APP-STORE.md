
# Part II Using build.phonegap.com for your SPA

Have you heard of mobile first? It is much easier if you 'Phonegap' first, as porting an app could mean some search and replace, especially for teams that don't have SPA experience.
Here is a conversion check list:
- resources must be on a relative path locally, or on an absolute path in the cloud (ex: https://mydomain/foo/index.html, the normal '//' will not work). Relative is 'local' and faster.
- you can test the web app locally, from file system via 'open file with browser', and not from http server. There is no http server on the phone.
- SPA
- handle the device ready event
- load 'cordova.js'


1. You should have a SPA/PWA web app deployed in the cloud before this step.

2. YOU MUST HAVE A DEBUGGER.
Best is to install the debugger in the cloud, like at above OSX build cloud machine. (Aside, meta admin docker images contains weinre pre-installed, check Meta section)
You can't go without debugger for PhoneGap development and deployment. There are some platform-specific remote debuggers. Instead, we recommend to install http://npmjs.com/package/weinre in the cloud, with:

		npm -g i weinre

		//start weinre with your IP
		weinre --boundHost X.X.X.X

		// in your browser, go to port weinre said above. There is a one line script that you need to put in your webapp. The Adobe web site has more info on Phonegap debugging.

Test that your debugger is working with any regular web page.
Create and account on Kobiton.com, appetize.io or similar mobile device emulator service in the cloud. Of course this is a cloud Android device - it's a good thing you installed weinre in the cloud; otherwise it wouldn't be seen on the WWW from different services.

3. Optional/demo: Download the PhoneGap GUI app, use it to create an F7 app, build it with http://build.phonegap.com and deploy to Kobiton.com Android device. It should take only minutes to create an Appstore app!

	See this video for detail: http://youtube.com/watch?v=Vyu2oWERWUM

4. To add the app to the iOS/Apple appstore, create a Apple Developer Program account with Apple. (this will set you back ~USD99). This can be an account that you share with your team.
You will also need a machine that runs OSX, but it can be in the cloud. A few places offer OSX hosting, e.g.: http://macstadium.com .
Generate SSH keys for the IOS app on OSX; you'll need them for the Appstore. 

5. Now that you have build.phonegap.com ready AND you have an SPA webapp running in the cloud, you can deploy your custom webapp.

		Get a  weinre script from weinre and put in header of your webapp.

		Zip the webapp with the config.xml. Upload to build.phonegap.com

		Build the Android app using build.phonegap.com and download the Android  App.

		In Kobiton.com, start a 'device'. Upload the app

		In browser: Monitor you weinre.

This way you have the same code base that runs on a webapp AND in the Appstore app! This is different from React Native.

Extra: You can use the mobileEx example to run ANY spa in the cloud with minor edits. All you need to know is PhoneGap.

There are 3 way to Phonegap:
- Just load the remote SPA from WWW, as in the mobileEx example.
- Load resources from WWW.
- Load local relative resource

The last one is fastest as there is no network latency. You can mix in the middle one to load larger resources that would not fit on a phone. For example: all of the blogs. You'd just get the remote JSON and then load it from the WWW.


