
This is an example that uses RIOT for dynamic binding.

Take a look at riotFirst folder to learn riot.
Here is a sample tag:
https://github.com/metabake/SPA/blob/master/riot/riotFirst/tags/first-tag.pug


		first-tag
			p oh hi
			p { num }

			script.
				doSomething(arg) {
					console.log('XXX ', arg)
					this.update({num: arg})
				}



To compile a riot/pug into a tag:

		nbake -t .
		// where . is the folder of the tag

And then use the tag:

		script(src='//cdn.jsdelivr.net/npm/riot@3.10.1/riot.min.js')

		script(src='tags/first-tag.js')
		p
		div
			first-tag

		script.
			let firstTag = riot.mount('first-tag')[0] // the first tag
			firstTag.doSomething(21)


Then learn how to do user auth and CRUD in crud folder.