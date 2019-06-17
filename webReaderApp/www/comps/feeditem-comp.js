
riot.tag2('feeditem-comp', '<div class="card card-feed"> <div class="card-header"> <div class="card-image"> <image riot-src="{this.urlToImage}"></image> </div> <div class="card-title h6">{this.title} <div class="card-subtitle text-gray"> <span if="{this.author}">by {this.author}, </span><span if="{this.publishedAt}">at {this.publishedAt}</span></div> </div> </div> <div class="card-body"> <div if="{this.description}"> {this.description}</div> <div if="{this.content}">{this.content}</div> </div> <div class="card-footer"> <div class="card-subtitle text-gray"> {this.source}</div> <div><a href="../../screen/feeditem/?id={this.feedId}" if="{this.showMore}">Show More</a><a href="../../screen/feed/" if="{this.goBack}">Go Back</a></div> </div> </div>', '', '', function(opts) {
    var comp = this
    this.title = opts.title
    this.description = opts.description
    this.author = opts.author

    this.feedId = opts.feedId
    this.goBack = opts.goBack
    this.showMore = opts.showMore
    this.content = opts.content
    this.urlToImage = opts.urlToImage
    this.publishedAt = opts.publishedAt
    this.source = opts.source

    this.on('mount', function(){

    })
});