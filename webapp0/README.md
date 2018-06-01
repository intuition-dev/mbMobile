# fR7

Mobile CMS/RSS example, Work in Progress. Uses Framework7, Flux, RiotJS and Pug/Jade.

Here is youtube demo video of this app running: http://youtube.com/watch?v=yUjt8EBZaac

To build/run in 4 steps.

1. Get logging, w/ free account on logz.io. Copy the api token/key.
With your editor, create a file www/ts/initLog.js, copy / paste this code using your key. This is the file that has the 'token', so you don't use my token:

			var token = 'XXX';
			Logger = new LogzioLogger(token);
			console.log('Logger ready. View logs on logz.io');
			// optional:
			Logger.log({
				param1: 'value1',
				param2: 'value2',
				message: 'Oh hi'
			});

2. Build: (first we need gulp dependencies )

			npm i

			gulp

