
declare var loadjs: any
declare var Backendless: any

console.log('model loading')

loadjs([
	'//cdn.jsdelivr.net/npm/amazon-cognito-identity-js@2.0.1/dist/amazon-cognito-identity.min.js'
	,'/zmodel/User.js'

	], 'ModelB', { //bundle name: loadjs.ready('ModelB', function() { 
			async: false //required due to loadjs bug with bundles
		}
)

