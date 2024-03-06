const socket = io()

socket.emit('pi-connect', 'online')

socket.on('pi-msg', (data) => {
    alert(JSON.stringify(data))
})