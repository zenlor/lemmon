# Lemmon

![Lemmon](http://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/C2012F6Lemmon.jpg/320px-C2012F6Lemmon.jpg)

a Small and simple wrapper to stream Comet connections from the server to the client. Named after the [Lemmon](http://en.wikipedia.org/wiki/C/2012_F6) Comet

### usage

Be aware that Lemmon sends strings or JSON object

server:

	var http = require('http')
	var Lemmon = require('lemmon')
	
	http.createServer(function (req, res) {
		var comet = Lemmon(res, 3e4)
		var stream = db.getStream()
		
		stream.on('data', function (obj) {
			comet.write(obj)
		})
		stream.on('end', function () {
			comet.end()
		})
	})

client:

	// todo

## License

MIT