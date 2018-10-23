class _SPArouter {
    constructor(foo) {
        this.zone = '#router';
        this.NavSTART = '_nav-start';
        this.NavDONE = '_nav-loaded';
        this.ERR = '_nav-ERR';
        addEventListener('nav', foo);
        const thiz = this;
        $(window).on('popstate', function (e) {
            let state = e.originalEvent.state;
            if (state !== null) {
                e.preventDefault();
                let oldUrl = localStorage.getItem('oldUrl');
                localStorage.setItem('oldUrl', state.url);
                thiz.loadHtml(state.url, oldUrl, true);
            }
        });
        $(document).on('click', 'a', function (e) {
            let anchor = $(e.currentTarget);
            let href = anchor.prop('href');
            console.log(href);
            if (!href || href.length < 1) {
                return;
            }
            if (anchor.is('.norouter'))
                return;
            e.preventDefault();
            let fromHref = window.location.href;
            localStorage.setItem('oldUrl', href);
            thiz.loadHtml(href, fromHref, null);
        });
        let pg = window.location.href;
        try {
            history.pushState({ url: pg }, '', pg);
        }
        catch (err) {
            console.log('no push state on file//', err);
        }
        localStorage.setItem('oldUrl', pg);
        this.fROOTfix();
    }
    loadHtml(toHref, fromHref, back_) {
        if (!back_) {
            try {
                history.pushState({ url: toHref }, '', toHref);
            }
            catch (err) {
                console.log('no push state on file//');
            }
        }
        this.disE({ type: this.NavSTART, toHref: toHref, fromHref: fromHref, back: back_ });
        let url = this.appendQueryString(toHref, { 'SPArouter': "\"" + this.zone + "\"" });
        const thiz = this;
        axios.get(url).then(function (txt) {
            let $html = $('<html></html>').append($(txt.data));
            let title = $html.find('title').first().text();
            document.title = title;
            let newContent = $html.find(thiz.zone).html();
            thiz.disE({ type: thiz.NavDONE, toHref: toHref, fromHref: fromHref, newContent: newContent, $html: $html, back: back_ });
        }).catch(function (er) {
            console.log('error', er);
            thiz.disE({ type: thiz.ERR, err: er });
        });
    }
    appendQueryString(url, queryVars) {
        let firstSeparator = (url.indexOf('?') == -1 ? '?' : '&');
        let queryStringParts = new Array();
        for (let key in queryVars) {
            try {
                queryStringParts.push(key + '=' + queryVars[key]);
            }
            catch (err) {
                console.log('q', err);
            }
        }
        let queryString = queryStringParts.join('&');
        return url + firstSeparator + queryString;
    }
    disE(msg) {
        dispatchEvent(new CustomEvent('nav', { detail: msg }));
    }
    fROOTfix() {
        let fROOT = location.toString().replace(location.search, '');
        let ii = fROOT.lastIndexOf(':');
        fROOT = fROOT.substring(ii + 1);
        const isFile = window.location.protocol == 'file:';
        if (isFile)
            fROOT = fROOT.slice(0, -11);
        console.log('fROOT ', fROOT);
        if (!isFile) {
            $('a').each(function (index, value) {
                $(this).attr('href', this.href.replace('/fROOT', ''));
            });
        }
        else
            $('a').each(function (index, value) {
                $(this).attr('href', this.href.replace('/fROOT', fROOT));
                console.log(this.href);
                let isSlash = this.href.slice(-1) == '/';
                if (isSlash)
                    $(this).attr('href', this.href + 'index.html');
                else
                    $(this).attr('href', this.href + '/index.html');
            });
    }
}
