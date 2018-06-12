
riot.tag2('fieldd-tag', '<div class="field"> <label>Data</label> <input type="text" name="dat" placeholder="more data"> </div>', '', '', function(opts) {
    this.clicked = function(arg) {
    	let data = $('#f2 [name="dat"]').val()
    	console.log(data)

    	let newRow = {
    		col1: data,
    		col2: true,
    		col3: 3.14159265
    	}

    	var newPK = db.collection('table_one').doc()
    	newPK.set(newRow)
    		.then(function() {
    			console.log('successfull')
    		})
    		.catch(function(error) {
    			console.error('oops', error)
    		})

    }.bind(this)
});