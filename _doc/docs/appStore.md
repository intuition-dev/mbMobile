
# Using build.phonegap.com from your SPA

- [SPA](https://youtu.be/LHFjjDPlU3A)


Have you heard of mobile first? You can also 'PhoneGap' first, with SPA.

Porting an app could mean some search and replace, especially for teams that don't have SPA experience.
Here is a conversion check list:
- resources must be on an absolute path in the cloud (ex: http://bla.mydomain.net/foo/my.js )
- SPA
- handle the device ready event
- load 'cordova.js'

1. You should have a SPA web app deployed in the cloud before this step. And it will be a lot easier if the web app files are mounted, easier to edit. Test that your debugger(eg. console.re) is working with any regular web page.

2. Make sure your ROOT in dat.yaml points to the url. Also make sure you bring patience, PhoneGap takes a bit of time to get going the first time you learn it - like anything new.

3. Now that you have build.phonegap.com ready AND you have an SPA webapp running in the cloud, you can deploy your custom webapp.

```
   Zip the web app with the config.xml. Upload to build.phonegap.com

   Build the Android app using build.phonegap.com and download the Android apx.

   Email via gmail the apx from build.phonegap.com. In your Andoriod device, open in gmail and run the apx app.

   In browser: Monitor you console.re.
```

Once you have this working, you can load some resource with a relative path in your initial page.
 But you can't start with '/' as the app is now running inside the file system. so 'asssets/my.js' will load it locally.

#### Last step in PhoneGap v8

You will need to edit the icons following PhoneGap docs that will display while the app is being loaded.




