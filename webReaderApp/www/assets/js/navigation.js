SPArouter.init(onNavigate);

function onNavigate(evt) {
    if (evt.detail.type == SPArouter.NavSTART) { //start
 
    } else if (evt.detail.type == SPArouter.NavDONE) {
        $('#router').html(evt.detail.newContent)
        // window.scrollTo(0, 0)
        
    }
}