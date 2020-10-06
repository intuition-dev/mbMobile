console.info('spa router');
class SPArouter {
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
        fetch(url, {}).then(function (fullResp) {
            return fullResp.text();
        }).then(function (str) {
            var temp = document.createElement('div');
            temp.innerHTML = str;
            let $html = temp;
            let newContent = $html.querySelector(SPArouter.zone);
            let title = $html.getElementsByTagName("title")[0];
            console.info('tit', title.text);
            document.title = title.text;
            SPArouter.fixROOT();
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
    static fixROOT() {
        if (SPArouter.isFile) {
            const $a = document.querySelectorAll('a');
            $a.forEach(function (item) {
                try {
                    let hasQuery = item.href.includes('?');
                    let hasAnchor = item.href.includes('#');
                    if (item.href.includes('index.html'))
                        return;
                    let splitSymbol = hasQuery ? '?' : (hasAnchor ? '#' : null);
                    const urlParts = item.href.split(splitSymbol);
                    if (urlParts[0].slice(-1) == '/') {
                        item.setAttribute('href', urlParts[0] + 'index.html' + (splitSymbol ? splitSymbol + urlParts[1] : ''));
                    }
                    else {
                        item.setAttribute('href', urlParts[0] + '/index.html' + (splitSymbol ? splitSymbol + urlParts[1] : ''));
                    }
                }
                catch (err) {
                    console.info(err);
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
                        SPArouter.fixROOT();
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
        addEventListener('popstate', function (e) {
            console.info(' popstate' + JSON.stringify(e.state));
            let state = e.state;
            if (state !== null) {
                e.preventDefault();
                let oldUrl = sessionStorage.getItem('oldUrl');
                sessionStorage.setItem('oldUrl', state.url);
                SPArouter.loadHtml(state.url, oldUrl, true);
            }
        });
        const $as = document.querySelectorAll('a');
        for (var i = 0; i < $as.length; i++) {
            const anchor = $as[i];
            anchor.addEventListener('click', function (evt) {
                let href = anchor.getAttribute('href');
                if (!href || href.length < 1) {
                    return;
                }
                if (anchor.classList.contains('norouter'))
                    return;
                evt.preventDefault();
                let fromHref = window.location.href;
                sessionStorage.setItem('oldUrl', href);
                SPArouter.loadHtml(href, fromHref, null);
            });
        }
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
new SPArouter();
