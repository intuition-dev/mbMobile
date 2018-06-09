
riot.tag2('feed-tag', '<virtual each="{items}"><a href="{url}"> <div class="ui fluid blue card"> <div class="image"><img riot-src="{image}"></div> <div class="content"> <div class="header">{title}</div> <div class="meta">{created}</div> <div class="description">{content_html}</div> </div> <div class="extra content"> <h5 class="ui image header"><img class="ui avatar image" riot-src="{author.avatar}"> <div class="content">{author.name} <div class="sub header">{read_minutes} minute read</div> </div> </h5> </div> </div></a> <p></p></virtual>', '', '', function(opts) {
    init()
    function init() {
    	thiz = this
    	loadjs.ready(['feed'], function () {
    		console.log('sz', feed.items.length)

    		first()

    		setTimeout(function(){
    			loadjs.done('firstPg')
    		},1000/60)
    	})

    	loadjs.ready(['style','firstPg'], function () {

    		const addEl = document.getElementById('add')
    		let observer = new IntersectionObserver(function(e){
    			if(e[0].isIntersecting) {
    				console.log('I can see the end')

    			}
    		})
    		observer.observe(addEl)
    	})
    }

    this.addFew = function(c) {
    	add(c)
    }.bind(this)

    this.items = []
    this.feed =[]
    thiz = this

    function first() {
    	thiz.feed = feed.items
    	for(let item of thiz.feed) {
    		item.url = '/blog/' + item.url +'/'
    		item.image =  item.url + item.image
    		console.log(item.image)
    	}

    	add(2)
    }

    function add(c) {

    	thiz.items.push( thiz.feed.pop())

    	thiz.update()

    }
});