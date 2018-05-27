riot.tag2('first-tag', '<p>oh hi</p> <p>{num}</p>', '', '', function(opts) {
    this.doSomething = function(arg) {
    	this.update({num: arg})
    }.bind(this)
});