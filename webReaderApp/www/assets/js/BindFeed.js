class BindFeed {
    constructor() {
        this.service = new ApiService(window.API);
        this.articles = []

        this.totalResults = 0
        this.alreadyLoaded = 0
        this.page = 1
    }

    read() {
        var _this = this

        return this.service.getFeedData(this.page)
            .then(function (feed) {
                var articles = feed['articles'].map(function (article) {
                    let temp = article
                    console.info("--(article['publishedAt']:", (article['publishedAt']))
                    var dt = luxon.DateTime.fromISO(article['publishedAt'])
                    temp['date'] = dt.toLocaleString()
                    return temp
                })
                var totalResults = feed['totalResults']
                return { articles: articles, totalResults: totalResults }
            })
            .then(function (data) {
                console.info("--data:", data)
                var articles = data['articles']

                _this.totalResults = data['totalResults']

                _this.articles.push(...articles)
                _this.alreadyLoaded = _this.articles.length
                console.info("--totalResults:", _this.totalResults)
                console.info("--_this.alreadyLoaded:", _this.alreadyLoaded)
                console.info("--this.articles:", _this.articles)

            })
    }

    getViewList() {
        var _this = this

        return Promise.all([this.read()])
            .then(function () {

                var feedItems = ''
                for (var i = 0; i < _this.articles.length; i++) {
                    feedItems += '<div id="feeditem-comp_' + i + '"></div>'
                }
                $('#feedList').html(feedItems)

                _this.articles.map(function (article, index) {
                    riot.mount('#feeditem-comp_' + index, 'feeditem-comp', {
                        title: article.title,
                        index: index,
                        feedId: article.id,
                        description: article.description,
                        author: article.author,
                        showMore: true,
                        urlToImage: article.urlToImage,
                        publishedAt: article.date,
                        source: article.source.name,
                        url: article.url
                    })[0]
                })

            })
    }

    getFeedItem(id) {
        var _this = this
        return Promise.all([this.read()])
            .then(function () {
                var article = _this.articles.filter(function (article) {
                    return article.id == id && article
                })[0]
                console.info("--article:", article)
                if (typeof article != 'undefined' && Object.keys(article).length) {
                    riot.mount('#feedItem', 'feeditem-comp', {
                        title: article['title'],
                        feedId: article.id,
                        author: article.author,
                        goBack: true,
                        urlToImage: article.urlToImage,
                        content: article.content,
                        publishedAt: article.date,
                        source: article.source.name,
                        url: article.url
                    })
                } else {
                    window.location.href = '/screen/feed/'
                }
            })
    }
}