'use strict'

const express = require('express')
const cluster = require('cluster')
const numWorkers = require('os').cpus().length

if (cluster.isMaster) {
  console.log('Master cluster setting up ' + numWorkers + ' workers...')

  for (var i = 0; i < numWorkers; i++) {
    cluster.fork()
  }

  cluster.on('online', function (worker) {
    console.log('Worker ' + worker.process.pid + ' is online')
  })

  cluster.on('exit', function (worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal)
    console.log('Starting a new worker')
    cluster.fork()
  })
} else {
// Constants
  const PORT = 8080
  const HOST = '0.0.0.0'

// App
  const app = express()
  app.get('/', (req, res) => {
    // console.log(process.pid)
    res.send('Hello world\n')
  })

  app.listen(PORT, HOST)
  console.log(`Running on http://${HOST}:${PORT}`)
}
