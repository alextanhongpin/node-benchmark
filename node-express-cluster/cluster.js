const http = require('http')
const os = require('os')
const cluster = require('cluster')

if (cluster.isMaster) {
  const cpus = os.cpus().length

  for (let i = 0; i < cpus; i++) {
    cluster.fork()
  }
} else {
  const server = http.createServer((req, res) => {
    for (let i = 0; i < 999999; i += 1) {
    }
    res.writeHead(200)
    res.end('Hello World')
  })

  server.listen(3000)
  console.log('server listening on port 3000')
}
