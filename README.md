- [SPA video](http://youtu.be/LHFjjDPlU3A)
- [Click for 'THE' B-M-SPA docs](http://doc.MetaBake.org/SPA/)

<img src="http://metabake.github.io/mbakeDocs/logo.jpg" width="100">

### MetaBakeis open source and extensible low-code productivity tool for programmers; including dynamic apps and data binding. 'All my friends KNOW the low-coder'

#### MetaBakeworks via static generation; with Pug, Markdown and more; including dynamic apps and data binding. We aim to grow the popularity of low-code. 

MetaBakembake CLI lets you generate websites and dynamic webapps in Pug by leveraging low-code pillars for high development productivity.

## Install

Easy to install

```sh
yarn global add mbake
mbake
```

Install note:
- If you get an error like 'Node Sass could not find a binding for your current environment' 
run$: ``` yarn global upgrade ```

## First Page

Create file index.pug
```pug
header
body
    p Hello #{key1}
```
and create file dat.yaml
```yaml
key1: World
```

### Now make with mbake:

```sh
mbake .
```

This will create index.html. 

Of course you can use regular Pug syntax to include other Pug files; or Markdown. MetaBakeMarkdown flavor includes CSS support:
```pug
    include:metaMD comment.md
```

## More

There are many example apps, and shipped templates include include: an CMS module, a watcher, SPA, Blog, Website, Slides, Dashboard, CRUD, PWA, Electron, Hybrid mobile apps, server-less via AWS | GCP FireStore, RIOTjs, Ads and more. 


MetaBakesupports CSS classes in Markdown, plus, because it uses Pug - it can also do any HTML layout. But MetaBakeis not static only - it fully supports and has examples, shipped apps, and docs for dynamic and even mobile apps.


Primary focus is high development productivity (via "low-code") and being easy to adopt. It is also fully flexible to build any web-app in any directory tree structure you like; anc use any CSS/SASS framework you like. Of course it is server-less, and it uses AWS S3 or GCP FireStore.


- Click for mbake Docs: [docs.MetaBake.org](http://docs.MetaBake.org)
- [git.MetaBake.org](http://git.MetaBake.org)
- Community [forum.MetaBake.org](http://forum.MetaBake.org)
- Check for the latest version of mbake: [npm.js](http://www.npmjs.com/package/mbake)
