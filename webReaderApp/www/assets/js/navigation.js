SPArouter.init(onNavigate);

function onNavigate(evt) {
    if (evt.detail.type == SPArouter.NavSTART) { //start
        if (evt.detail.fromHref.indexOf('landing') > -1) {
            // fsm.split() //do nothing here
        }
    } else if (evt.detail.type == SPArouter.NavDONE) {
        $('#router').html(evt.detail.newContent)

        // window.scrollTo(0, 0)
    }
}