const socket = io()

$('#sendBtn').on('click', () => {
    let msgObj = {
        service: 'messaging',
        sender: $('#user-name-input').val(),
        data: $('#text-input').val()
    }
    console.log($('#text-input').val())
    socket.emit('message', JSON.stringify(msgObj))
})