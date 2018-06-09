console.log('tst')
loadjs('setupModel.js')

declare var QUnit: any
declare var loadjs: any

loadjs.ready('ModelB', function() { // bundle
	console.log('User')
	QUnit.test( 'list', function( assert :any ) {
		assert.expect( 1 )
		var done = assert.async()
		tstU(assert, done)
	})
})

var em = 'vicmasons@gmail.com'
var p = '123123'


function tstU(assert :any, done :any) {
	console.log('start')

	User.enterNewPswdWCode(em,p, '223149').then(function(val) {
		console.log(val)
		assert.ok(true)
		done()

	}).catch(function(err) {
		console.log(err)
		console.log(err.message)
	})
}

function tstA(assert :any, done :any) {
	console.log('start')

	User.authenticate(em,p).then(function(val) {

		/*
		User.getUserAttributes().then(function(val) {
			console.log(val)
			assert.ok(true)
			done()
		})
		*/
		User.logout()

	}).catch(function(err) {
		console.log(err)
		console.log(err.message)

	})
}


function tstSignUp(assert :any, done :any) {
	console.log('start')

	User.signUp('vic', em,p).then(function(val) {
		console.log(val)
		assert.ok(true)
		done()
	}).catch(function(err) {
		console.log(err)
		console.log(err.message)

	})
}
