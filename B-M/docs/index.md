


### (B-M) Bricks and Mortar with SPA, router, PhoneGap, Blog
and more examples

## Prerequisites for App Store

For cross platform development, with single code base based on Pug, we use Adobe PhoneGap.com, version 8+ at http://build.PhoneGap.com. Before going to the PhoneGap section you need to have an S3 WebApp, mounted locally, as explained in nBake docs

You may want to glance SPA Router (click on left), or even skip SPA|PhoneGap and look at other examples.

```
   # extract sample single code base phonegap app to a mounted S3 directory.
   nbake -s
   cd SPA/www
   # only www folder goes to S3 mount, config.xml is for a later step.

   # we will be running mobile, but we need to see what is going on. In a browser go to http://jsconsole.com. At that website type
   :listen

   # copy above output, and paste in your extracted folder/SPA/www/layout/layout.pug, at the top of that file.
   # and build
   nBake .

   # now open your S3 webapp, what ever the S3 url is and make sure everything looks OK for mobile size and that jsconsole above is working.

   # now use you IDE to edit each dat.yaml. Change ROOT: '' to instead be the S3 URL from above.
   nbake .
   # Check that web app is OK.

```
Notice most of the work is regular web app development. If above works, no we can deploy, go to App Store (link on the left).

