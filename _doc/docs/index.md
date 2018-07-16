


### (B-M) Bricks and Mortar with SPA, router, PhoneGap, Blog
and more examples

## Prerequisites for App Store

We use Adobe PhoneGap version 8+ for cross platform development with a single code base based on Pug using https://build.phonegap.com. Before going to the PhoneGap section you need to have an S3 WebApp, mounted locally, as explained in nBake docs.

You may want to look at SPA Router (click on left), or even skip SPA/PhoneGap and look at other examples. SPA-Router (on the left) is a easy way to get started. Else, jump on in here.

Before doing app store, make sure your web app is mounted to S3 and copy the www folder to that mount. Then fix the CSS files in S3 (properties/metadata/Content-Type) to be text/css. The ROOT in each dat.yaml points to the absolute path (ie: your http:// in the cloud) - use your IDE. Like this:
```
   # extract sample single-codebase PhoneGap app to a mounted S3 directory.
   nbake -s
   cd SPA/www
   # only www folder goes to S3 mount, config.xml is for a later step.

   # we will be running mobile, but we need to see what is going on. In a browser, go to http://console.re and configure your layout.pug

   # and build
   nBake .

   # now open your S3 webapp, whatever the S3 url is and make sure everything looks OK for mobile size and that console.re above is working.

   # now use your IDE to edit each dat.yaml. Change ROOT: '' to instead be the S3 URL from above.
   nbake .
   # Check that the web app is OK.

```
Notice most of the work is regular web app development. If above works, we can now deploy; go to App Store (link on the left).

