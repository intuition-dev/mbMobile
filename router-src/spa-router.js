console.info('spa router test');
class SPArouter {
    constructor() { }
    static loadHtml(toHref, fromHref, back_) {
        if (!back_) {
            try {
                history.pushState({ url: toHref }, '', toHref);
            }
            catch (err) {
                console.info('no push state on file//');
            }
        }
        SPArouter.disE({ type: SPArouter.NavSTART, toHref: toHref, fromHref: fromHref, back: back_ });
        let url = toHref;
        console.info(url);
        axios.get(url).then(function (txt) {
            let $html = $('<html></html>').append($(txt.data));
            let title = $html.find('title').first().text();
            document.title = title;
            let newContent = $html.find(SPArouter.zone).html();
            SPArouter.fROOTfix();
            SPArouter.disE({ type: SPArouter.NavDONE, toHref: toHref, fromHref: fromHref, newContent: newContent, $html: $html, back: back_ });
        }).catch(function (er) {
            console.info('error', er);
            SPArouter.disE({ type: SPArouter.ERR, err: er });
        });
    }
    static appendQueryString(url, queryVars) {
        let firstSeparator = (url.indexOf('?') == -1 ? '?' : '&');
        let queryStringParts = new Array();
        for (let key in queryVars) {
            try {
                queryStringParts.push(key + '=' + queryVars[key]);
            }
            catch (err) {
                console.info('q', err);
            }
        }
        let queryString = queryStringParts.join('&');
        return url + firstSeparator + queryString;
    }
    static disE(msg) {
        setTimeout(function () {
            dispatchEvent(new CustomEvent('nav', { detail: msg }));
        }, 1);
    }
    static checkPlatform() {
        var native = false;
        if (document.URL.indexOf('http://') === -1
            && document.URL.indexOf('https://') === -1) {
            native = true;
        }
        var isFile = window.location.protocol == 'file:';
        if (isFile || native) {
            try {
                window.nodeRequire = require;
                delete window.require;
                delete window.exports;
                delete window.module;
                console.log('fixed for non http/native');
            }
            catch (err) { }
        }
        SPArouter.isFile = native || isFile;
        if (SPArouter.isFile) {
            SPArouter.watchATags();
        }
    }
    static fROOTfix() {
        if (SPArouter.isFile) {
            $('a').each(function (index, value) {
                let isSlash = this.href.slice(-1) == '/';
                let hasQuery = this.href.indexOf('?');
                if (this.href.includes('index.html'))
                    return;
                if (hasQuery) {
                    const urlParts = this.href.split('?');
                    if (urlParts[0].slice(-1) == '/') {
                        $(this).attr('href', urlParts[0] + 'index.html?' + urlParts[1]);
                    }
                    else {
                        $(this).attr('href', urlParts[0] + '/index.html?' + urlParts[1]);
                    }
                }
                else if (isSlash) {
                    $(this).attr('href', this.href + 'index.html');
                }
                else {
                    $(this).attr('href', this.href + '/index.html');
                }
            });
        }
    }
    static watchATags() {
        const target = document.querySelector('body');
        let debounce;
        const config = {
            childList: true,
            subtree: true
        };
        function subscriber(mutations) {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    clearTimeout(debounce);
                    debounce = setTimeout(() => {
                        console.log('mutation');
                        SPArouter.fROOTfix();
                    }, 0);
                }
            });
        }
        const observer = new MutationObserver(subscriber);
        observer.observe(target, config);
    }
    static init(foo) {
        SPArouter.checkPlatform();
        addEventListener('nav', foo);
        $(window).on('popstate', function (e) {
            let state = e.originalEvent.state;
            if (state !== null) {
                e.preventDefault();
                let oldUrl = sessionStorage.getItem('oldUrl');
                sessionStorage.setItem('oldUrl', state.url);
                SPArouter.loadHtml(state.url, oldUrl, true);
            }
        });
        $(document).on('click', 'a', function (e) {
            let anchor = $(e.currentTarget);
            let href = anchor.prop('href');
            console.info(href);
            if (!href || href.length < 1) {
                return;
            }
            if (anchor.is('.norouter'))
                return;
            e.preventDefault();
            let fromHref = window.location.href;
            sessionStorage.setItem('oldUrl', href);
            SPArouter.loadHtml(href, fromHref, null);
        });
        let pg = window.location.href;
        try {
            history.pushState({ url: pg }, '', pg);
        }
        catch (err) {
            console.info('no push state on file//', err);
        }
        sessionStorage.setItem('oldUrl', pg);
    }
}
SPArouter.zone = '#router';
SPArouter.NavSTART = '_nav-start';
SPArouter.NavDONE = '_nav-loaded';
SPArouter.ERR = '_nav-ERR';
