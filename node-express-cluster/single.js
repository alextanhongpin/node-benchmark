const http = require('http')

const server = http.createServer((req, res) => {
  // To see the kind of advantage clustering can give CPU bound applications, replace the setTimeout with a for loop.
  for (let i = 0; i < 999999; i += 1) {
  }
  res.writeHead(200)
  res.end('Hello World')
})

server.listen(3000)
console.log('server listening on port 3000')
