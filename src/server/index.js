const WebSocket = require('ws')

const wss = new WebSocket.Server({
    port: 9876
})
console.log('websocket ready')
    // whenever there is a websocket connection
    // we have ws for each partivcular machine/client/server
    wss.on('connection', function(ws) {
        console.log('hello from the server')
        // i want to listen on a message and send it to a server
        ws.on('message', function(data) {
            // console.log(data) // <Buffer 22 68 65...>
            // data should be send as JSON.stringify(message)
            const dataToString = JSON.parse(data) // on a frontend ws.send(JSON.stringify('hello server, whats up ?'))
            console.log(`message from ws: ${dataToString}`)
            // whenever there is connection, we are listening for an event = mesage
            // on for this particular websocket we are going send that data back
            ws.send(dataToString)
        })
    })

// console.log(wss)


// now if I enter localhost:9876 there is a message: 'upgrade required'
// ws = websocket
// wss = secured websocket ~ http vs https