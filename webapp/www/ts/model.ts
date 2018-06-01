
declare var Logger: any

declare var fluxify: any
declare var RSSParser: any

declare var parser: any

// I did not convert to ES6 yes, but there is class example in assets/jsLibs?logger.ts

// fluxify
function act(action, arg) {// sugar
	fluxify.doAction(action, arg )
}

var story = fluxify.createStore({
	id: 'story',
	actionCallbacks: {
		updateStory: function( updater, arg ){
			updater.set({
				store: arg
			})//set
		}//action
	}//c-bs
})//()
Logger.log('model ready' )

/*
var item = new Object();
item.a = 'b'

set up event listener s
story.on( 'change', function( updates ){
	Logger.log( story.getState() )
})

act('updateStory', item )
*/

//fetch ///////////////
const CORS = 'https://cors-anywhere.herokuapp.com/'
const RED =  'https://www.reddit.com/.rss'
const STAR = 'assets/feed.xml'

function modelInit() {
	parser = new RSSParser()
}

function access() {//specify url
	Logger.log('fetching')
	return CORS+RED;
} 