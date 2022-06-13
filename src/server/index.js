const WebSocket = require('ws')

const wss = new WebSocket.Server({
    port: 9876
})

console.log(`Say hi to WebSocket on port 9876`)