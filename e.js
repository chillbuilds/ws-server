const app = require('express')()
const express = require('express')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const path = require('path')
const port = process.env.PORT || 8080

let homeServerConnected = false
let homeServerID;

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/home-server', (req, res) => {
    res.sendFile(path.join(__dirname, './public/html/home-server.html'))
})

app.get('/test', (req, res) => {
    res.send('test')
})

io.on('connection', (socket) => {
  console.log(`user connection: ${socket.id}`)
  socket.on('disconnect', function () {
    if(socket.id == homeServerID){
        homeServerConnected = false
    }
    console.log('user disconnected')
})

  socket.on('message', (data) => {
    data = JSON.parse(data)
    if(data.service == 'messaging'){
        console.log('notify the pi')
        io.to(homeServerID).emit('pi-msg', data)
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
        homeServerID = socket.id
        console.log('pi online')
        console.log('pi id:', homeServerID)
    }
  })
})

server.listen(port, function() {
  console.log(`Listening on port ${port}`)
})