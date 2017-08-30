const express = require('express')
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