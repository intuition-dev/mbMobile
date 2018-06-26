
# Part II Using build.phonegap.com for your SPA


   See this video for example: http://youtube.com/watch?v=Vyu2oWERWUM

Have you heard of mobile first? It is much easier if you 'Phonegap' first, as porting an app could mean some search and replace, especially for teams that don't have SPA experience.
Here is a conversion check list:
- resources must be on an absolute path in the cloud (ex: https://mydomain/foo/index.html, the normal '//' will not work).
- you can test the web app locally, from file system via 'open file with browser', and not from http server. There is no http server on the phone.
- SPA
- handle the device ready event
- load 'cordova.js'


1. You should have a SPA/PWA web app deployed in the cloud before this step. And it will be a lot easier if the production files are mounted.

ex hosting w/ S3:


      {
      "Version":"2012-10-17",
      "Statement": [{
         "Sid":"PublicReadGetObject",
            "Effect":"Allow",
         "Principal": "*",
            "Action":["s3:GetObject"],
            "Resource":["arn:aws:s3:::YOUR-BUCKET/*"
            ]
         }]
      }


2. YOU MUST HAVE A DEBUGGER.
You can't go without debugger for PhoneGap development and deployment. There are some platform-specific remote debuggers. Instead, we recommend to install http://jsconsole.com/ in the cloud, and edit the main layout.pug. Once on jsconsole.com type in colon listen


      :listen


Test that your debugger is working with any regular web page.
Create and account on Kobiton.com, appetize.io or similar mobile device emulator service in the cloud. Of course this is a cloud Android device

3. Optional/demo: Download the PhoneGap GUI app, use it to create an F7 app, build it with http://build.phonegap.com and deploy to Kobiton.com Android device. It should take only minutes to create an Appstore app!

4. To add the app to the iOS/Apple appstore, create a Apple Developer Program account with Apple. (this will set you back ~USD99). This can be an account that you share with your team.
You will also need a machine that runs OSX, but it can be in the cloud. A few places offer OSX hosting, e.g.: http://macstadium.com .
Generate SSH keys for the IOS app on OSX; you'll need them for the Appstore.

5. Now that you have build.phonegap.com ready AND you have an SPA webapp running in the cloud, you can deploy your custom webapp. Create a https://kobiton.com account.

      Zip the webapp with the config.xml. Upload to build.phonegap.com

      Build the Android app using build.phonegap.com and download the Android  App.

      In Kobiton.com, start a 'device'. Upload the app

      In browser: Monitor you jsconsole.com.


This way you have the same code base that runs on a webapp AND in the Appstore app! This is different from React Native.

Extra: You can use the mobileEx example to run ANY spa in the cloud with minor edits. All you need to know is PhoneGap.

There are 3 way to Phonegap:
- Just load the remote SPA from WWW, as in the mobileEx example.
- Load resources from WWW.

The last one is fastest as there is no network latency. You can mix in the middle one to load larger resources that would not fit on a phone. For example: all of the blogs. You'd just get the remote JSON and then load it from the WWW.


