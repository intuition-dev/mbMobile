
riot.tag2('feed-tag', '<div class="flex"><virtual each="{items}"><a class="flexItem" href="{url}"> <div class="card item"> <div class="card-image"> <figure class="image"><img class="cardImg" riot-src="{image}"></figure> </div> <div class="card-content"> <div class="media"> <div class="media-left"> <figure class="image is-48x48"><img riot-src="{author.avatar}"></figure> </div> <div class="media-content"> <p class="title is-4">{title}</p> <p class="subtitle is-6">{author.name}</p> </div> </div> <div class="content">{content_html}</div> <time datetime="2016-1-1">{created}</time> </div> </div></a></virtual> <div id="add"> <p></p> </div> </div>', 'feed-tag .item,[data-is="feed-tag"] .item{ width: 300px; margin: 5px; height: 610px; } feed-tag .cardImg,[data-is="feed-tag"] .cardImg{ height: 300px !important; object-fit: cover; } feed-tag .subtitle,[data-is="feed-tag"] .subtitle{ margin-bottom: .5rem !important; }', '', function(opts) {
    this.on('*', function(evt) {

    })

    this.items = []
    this.feed =[]
    thiz = this

    init()

    function init() {
       console.log('init')
       thiz.items = []
       thiz.feed =[]
       fetch(ROOT+'/blog/items.json').then(function(resp) {
          return resp.json()
       }).then(function(json) {
          feed = json
          console.log('r ready')
          setup()
          add(2)

          thiz.observer = new IntersectionObserver(function(e){
             if(e[0].isIntersecting) {
                console.log('I can see the end')
                add(2)
             }
          })
          thiz.observer.observe(thiz.addEl)
       })
    }

    this.addFew = function(c) {
       add(c)
    }.bind(this)

    function setup() {
       thiz.addEl = document.getElementById('add')
       console.log(thiz.addEl)
       thiz.feed = feed.items
       for(let item of thiz.feed) {
          item.url = ROOT + '/blog/' + item.url +'/'
          item.image =  item.url + item.image

       }
    }

    function add(c) {
       console.log('add',c)

       var i
       for (i = 0; i < c; i++) {
          if(thiz.feed[0] )
             thiz.items.push( thiz.feed.pop())
       }
       thiz.update()

       if(inView(thiz.addEl) && thiz.feed[0] )
          add(1)

    }
});