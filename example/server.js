var http = require('http')
var Lemmon = require('..')

var server = http.createServer(function (req, res) {
  var log = console.log.bind(console, '[' + Math.floor(Math.random() * 100) + ']')
  var comet = new Lemmon(res, 3000)
  var count = 1

  log('incoming request')

  var last = Date.now()
  var interval = setInterval(function () {
    if (count === 21) {
      log('Ending')
      comet.end()
      clearInterval(interval)
    } else if (Math.random() > 0.5) {
      log(Date.now() - last + 'ms','sending data to the connected client')
      comet.send(Date.now() + '# ' + count)
      count += 1
    }
  }, 5e3)

  log('send initial message')
  comet.send(Date.now() + '# 0')

  req.on('error', function (e) {
    log('request error', e)
  })
})

server.listen(process.env.PORT || 3000, function () {
  console.log('server listening to port ', process.env.PORT || 3000)
})
