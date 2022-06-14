const url = `ws://127.0.0.1:9876/websocket`
const server = new WebSocket(url)

const message = document.getElementById('messages')
const input = document.getElementById('message')
const button = document.getElementById('send')

button.disabled = true
button.addEventListener('click', sendMessage, false)

// we need to connect, before sending a message:
server.onopen = function () {
    button.disabled = false
}

server.onmessage = function(event) {
    const { data } = event
    generateMessageEntry(data, 'Server')
}

function generateMessageEntry(msg, type){
    const newMessage = document.createElement('div')
    newMessage.innerText = `${type} says: ${msg}`
    message.appendChild(newMessage)
}

function sendMessage() {
    const text = JSON.stringify(input.value) // wywala sie bez JSON.stringify
    generateMessageEntry(text, 'Client')
    server.send(text)
}
