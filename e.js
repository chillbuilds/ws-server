const WebSocket = require('ws')
    const port = process.env.PORT || 3000
    const wss = new WebSocket.Server({ port: port })
    wss.on('connection', ws => {
        ws.on('message', msg => {
            ws.send('msg received:', msg)
            console.log('msg: ', msg.toString('utf-8'))
        })
        ws.send('connected to server')
    })