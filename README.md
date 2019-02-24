- [SPA video](https://youtu.be/LHFjjDPlU3A)
- [Click for 'THE' B-M-SPA docs](http://doc.mBake.org/SPA/)


#### mBake.org is a LOW-CODE productivity for application developers via static generation; with Pug, Markdown and more; including dynamic data binding. *Some developers implement applications faster than others.*


MetaBake mbake CLI lets you generate websites and dynamic webapps in Pug by leveraging LOW-CODE pillars for high development productivity.

## Install

Easy to install

```sh
yarn global add mbake
mbake
```

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

### Now make with mbake

```sh
mbake .
```

This will create index.html. 

Of course you can use regular Pug syntax to include other Pug files; or Markdown. MetaBake Markdown flavor includes CSS support:
```pug
    include:metaMD comment.md
```

## Home Page

There are many example apps, and shipped templates include include an CMS module, a watcher module, SPA, Blog, Website, Slides, Dashboard, CRUD, PWA, Electron, Hybrid mobile apps, Cloud v2.0 via AWS|FireStore, RIOTjs, Ads and more. 

Primary focus is high development productivity (via "low-code") and being easy to learn. It is also fully flexible to build any WebApp in any directory tree structure you like an use any CSS/SASS framework you like.

MetaBake supports CSS classes in Markdown, plus, because it uses Pug - it can also do any HTML layout. But MetaBake is not static only - it fully supports and has examples, shipped apps, and docs for dynamic and even mobile apps.


[mBake.org](http://mBake.org)

