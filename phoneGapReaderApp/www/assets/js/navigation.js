var fsm = new StateMachine({
    init: 'loaded',
    transitions: [
        { name: 'start', from: 'loaded', to: 'navStart' },
        { name: 'process', from: 'navStart', to: 'navEnd' },
        { name: 'end', from: 'navEnd', to: 'loaded' },
    ],
    methods: {
    }
})

SPArouter.init(onNavigate);

function onNavigate(evt) {
    if (evt.detail.type == SPArouter.NavSTART) { //start
        fsm.start();
    } else if (evt.detail.type == SPArouter.NavDONE) {
        fsm.process();
        $('#router').html(evt.detail.newContent)
        fsm.end();
    }
}
