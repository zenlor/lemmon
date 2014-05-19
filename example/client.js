var http = require('http')
var log = console.log.bind(console)

var messages = []
var last = Date.now()

var request = http.request({hostname: 'localhost', port: process.env.PORT || 3000, path: '/'})

request.on('response', function (res) {
  log('response')
  res.on('data', function (message) {
    message = message.toString()
    log('received a message: ', message, ' - ', Date.now() - last, 'ms')
    last = Date.now()
    messages.push(message)
  })

  res.on('end', function () {
    log('response end')
  })
})

request.on('end', function () {
  log('received: %s messages', messages.length)
  log('messages:', JSON.stringify(messages, null, 2))

  process.exit()
})

request.end()
