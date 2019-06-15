console.info('v');
var SPArouter = (function () {
    function SPArouter() {
    }
    SPArouter.loadHtml = function (toHref, fromHref, back_) {
        console.info('loaded', toHref);
        if (!back_) {
            try {
                history.pushState({ url: toHref }, '', toHref);
            }
            catch (err) {
                console.info('no push state on file//');
            }
        }
        SPArouter.disE({ type: SPArouter.NavSTART, toHref: toHref, fromHref: fromHref, back: back_ });
        var url = SPArouter.appendQueryString(toHref, { 'SPArouter': "\"" + SPArouter.zone + "\"" });
        console.info(url);
        axios.get(url).then(function (txt) {
            var $html = $('<html></html>').append($(txt.data));
            var title = $html.find('title').first().text();
            document.title = title;
            var newContent = $html.find(SPArouter.zone).html();
            SPArouter.disE({ type: SPArouter.NavDONE, toHref: toHref, fromHref: fromHref, newContent: newContent, $html: $html, back: back_ });
        }).catch(function (er) {
            console.info('error', er);
            SPArouter.disE({ type: SPArouter.ERR, err: er });
        });
    };
    SPArouter.appendQueryString = function (url, queryVars) {
        var firstSeparator = (url.indexOf('?') == -1 ? '?' : '&');
        var queryStringParts = new Array();
        for (var key in queryVars) {
            try {
                queryStringParts.push(key + '=' + queryVars[key]);
            }
            catch (err) {
                console.info('q', err);
            }
        }
        var queryString = queryStringParts.join('&');
        return url + firstSeparator + queryString;
    };
    SPArouter.disE = function (msg) {
        setTimeout(function () {
            dispatchEvent(new CustomEvent('nav', { detail: msg }));
        }, 1);
    };
    SPArouter.fROOTfix = function () {
        var fROOT = location.toString().replace(location.search, '');
        var ii = fROOT.lastIndexOf(':');
        fROOT = fROOT.substring(ii + 1);
        var isFile = window.location.protocol == 'file:';
        if (isFile)
            fROOT = fROOT.slice(0, -11);
        console.info('***: fROOT ', fROOT);
        if (!isFile) {
            $('a').each(function (index, value) {
                console.info('fROOT', this.href);
                $(this).attr('href', this.href.replace('/fROOT', ''));
            });
        }
        else
            $('a').each(function (index, value) {
                $(this).attr('href', this.href.replace('/fROOT', fROOT));
                console.info('fROOT', this.href);
                var isSlash = this.href.slice(-1) == '/';
                if (isSlash)
                    $(this).attr('href', this.href + 'index.html');
                else
                    $(this).attr('href', this.href + '/index.html');
            });
    };
    SPArouter.init = function (foo) {
        addEventListener('nav', foo);
        $(window).on('popstate', function (e) {
            var state = e.originalEvent.state;
            if (state !== null) {
                e.preventDefault();
                var oldUrl = sessionStorage.getItem('oldUrl');
                sessionStorage.setItem('oldUrl', state.url);
                SPArouter.loadHtml(state.url, oldUrl, true);
            }
        });
        $(document).on('click', 'a', function (e) {
            var anchor = $(e.currentTarget);
            var href = anchor.prop('href');
            console.info(href);
            if (!href || href.length < 1) {
                return;
            }
            if (anchor.is('.norouter'))
                return;
            e.preventDefault();
            var fromHref = window.location.href;
            sessionStorage.setItem('oldUrl', href);
            SPArouter.loadHtml(href, fromHref, null);
        });
        var pg = window.location.href;
        try {
            history.pushState({ url: pg }, '', pg);
        }
        catch (err) {
            console.info('no push state on file//', err);
        }
        sessionStorage.setItem('oldUrl', pg);
        SPArouter.fROOTfix();
    };
    SPArouter.zone = '#router';
    SPArouter.NavSTART = '_nav-start';
    SPArouter.NavDONE = '_nav-loaded';
    SPArouter.ERR = '_nav-ERR';
    return SPArouter;
}());
