
# Using build.phonegap.com from your SPA

Have you heard of mobile first? You can also 'Phonegap' first, as porting an app could mean some search and replace, especially for teams that don't have SPA experience.
Here is a conversion check list:
- resources must be on an absolute path in the cloud (ex: http://bla.mydomain.net/foo/my.js )
- SPA
- handle the device ready event
- load 'cordova.js'

1. You should have a SPA web app deployed in the cloud before this step. And it will be a lot easier if the web app files are mounted, easier to edit. Test that your debugger(eg. jsConsole.com) is working with any regular web page.

2. Create and account on Kobiton.com, or similar mobile device emulator service in the cloud.

4. For Andorid, or Windows, skip this step. To add the app to the iOS/Apple appstore, create a Apple Developer Program account with Apple. (this will set you back ~USD99). This can be an account that you share with your team.
You will also need a machine that runs OSX, but it can be in the cloud. A few places offer OSX hosting, e.g.: http://macstadium.com .
Generate SSH keys for the IOS app on OSX; you'll need them for the Appstore.

5. Now that you have build.phonegap.com ready AND you have an SPA webapp running in the cloud, you can deploy your custom webapp.

```
   Zip the webapp with the config.xml. Upload to build.phonegap.com

   Build the Android app using build.phonegap.com and download the Android  App.

   In Kobiton.com, start a 'device'. Upload the app

   In browser: Monitor you jsconsole.com.
```

This way you have the same code base that runs on a webapp AND in the Appstore app! This is different from React Native.

Extra: You can use the mobileEx example to run ANY spa in the cloud with minor edits. All you need to know is PhoneGap.

There are 3 way to Phonegap:
- Just load the remote SPA from WWW, as in the mobileEx example.
- Load resources from WWW.

The last one is fastest as there is no network latency. You can mix in the middle one to load larger resources that would not fit on a phone. For example: all of the blogs. You'd just get the remote JSON and then load it from the WWW.


