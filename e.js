const app = require('express')()
const express = require('express')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const path = require('path')
const port = process.env.PORT || 8080

let homeServerConnected = false

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

io.on('connection', (socket) => {
  console.log(`user connection: ${socket.id}`)
  socket.on('disconnect', function () {
    console.log('user disconnected')
  })

  socket.on('message', (data) => {
    data = JSON.parse(data)
    if(data.service == 'messaging'){
        console.log('notify the pi')
    }
    else{
        console.log(data)
    }
    if(homeServerConnected == false){
        socket.emit('message', 'failed to send: messaging receiver offline')
    }
  })

  socket.on('pi-connect', (data) => {
    if(data == 'online'){
        homeServerConnected = true
    }
  })
})

server.listen(port, function() {
  console.log(`Listening on port ${port}`)
})