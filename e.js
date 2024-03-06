const app = require('express')()
const express = require('express')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const path = require('path')
const port = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

io.on('connection', (socket) => {
  console.log('user connected')
  socket.on('disconnect', function () {
    console.log('user disconnected')
  })
})

server.listen(port, function() {
  console.log(`Listening on port ${port}`)
})