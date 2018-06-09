console.log('tst');
loadjs('setupModel.js');
loadjs.ready('ModelB', function () {
    console.log('User');
    QUnit.test('list', function (assert) {
        assert.expect(1);
        var done = assert.async();
        tstU(assert, done);
    });
});
var em = 'vicmasons@gmail.com';
var p = '123123';
function tstU(assert, done) {
    console.log('start');
    User.enterNewPswdWCode(em, p, '223149').then(function (val) {
        console.log(val);
        assert.ok(true);
        done();
    })["catch"](function (err) {
        console.log(err);
        console.log(err.message);
    });
}
function tstA(assert, done) {
    console.log('start');
    User.authenticate(em, p).then(function (val) {
        /*
        User.getUserAttributes().then(function(val) {
            console.log(val)
            assert.ok(true)
            done()
        })
        */
        User.logout();
    })["catch"](function (err) {
        console.log(err);
        console.log(err.message);
    });
}
function tstSignUp(assert, done) {
    console.log('start');
    User.signUp('vic', em, p).then(function (val) {
        console.log(val);
        assert.ok(true);
        done();
    })["catch"](function (err) {
        console.log(err);
        console.log(err.message);
    });
}
