This is the Hybrid section, based on SPA.

Because native are file based and don't have an http server, locations are relative. Eg '../' instead of '/'.
So it is easier if all the screens or pages are at same level.

A key part is making sure SEO works. No mater what page you load.


- [SPA video](http://youtu.be/LHFjjDPlU3A)



### MetaBake is open source and extensible low-code productivity tool for programmers; including dynamic apps and data binding. 'All my friends KNOW the low-coder'


## More

There are many example apps, and shipped templates include: an CMS module, a watcher, SPA, CMS, Website, Slides, Dashboard, CRUD, PWA, Electron, Hybrid mobile apps, server-less via AWS | GCP FireStore, RIOTjs, Ads and more. 


MetaBake supports CSS classes in Markdown, plus, because it uses Pug - it can also do any HTML layout. But MetaBake is not static only - it fully supports and has examples, shipped apps, and docs for dynamic and even mobile apps.


Primary focus is high development productivity (via "low-code") and being easy to adopt. It is also fully flexible to build any web-app in any directory tree structure you like; anc use any CSS/SASS framework you like. Of course it is server-less, and it uses AWS S3 or GCP FireStore.


- Click for mbake Docs: [docs.MetaBake.org](http://docs.MetaBake.org)
- [git.MetaBake.org](http://git.MetaBake.org)
- Community [forum.MetaBake.org](http://forum.MetaBake.org)
- Check for the latest version of mbake: [npm.js](http://www.npmjs.com/package/mbake)


# SPA-router usage for Electron
SPA is used in electron apps the same way it's used everywhere else:

1) You have `#router` tag - it's children elements are goung to be replaced by router.
2) You initialize SPA by calling the following:
```javascript
SPArouter.init(onNavigate);

function onNavigate(evt) {
    if (evt.detail.type == SPArouter.NavSTART) { //start
 
    } else if (evt.detail.type == SPArouter.NavDONE) {
        $('#router').html(evt.detail.newContent)
        // window.scrollTo(0, 0)
        
    }
}
```
