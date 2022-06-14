const WebSocket = require('ws')
const express = require('express')
const app = express()
const path = require('path')

app.use('/', express.static(path.resolve(__dirname, '../client')))

const server = app.listen(9876)

const wss = new WebSocket.Server({
    server: server
})
console.log('websocket ready')
    // whenever there is a websocket connection
    // we have ws for each partivcular machine/client/server

    const clients = []
    wss.on('connection', function(ws) {

        // whenever there is connection we push it to a clients array
        // whenever there is a message we send it to all connections
        clients.push(ws)
        // console.log('hello from the server')
        // i want to listen on a message and send it to a server
        ws.on('message', function(data) {
            // console.log(data) // <Buffer 22 68 65...>
            // data should be send as JSON.stringify(message)
            const dataToString = JSON.parse(data) // on a frontend ws.send(JSON.stringify('hello server, whats up ?'))
            // whenever there is connection, we are listening for an event = mesage
            // on for this particular websocket we are going send that data back
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(dataToString)
                }
            })
        })
    })
/* WebSocket.readyState - 
CONNECTING: 0
OPEN: 1
CLOSING: 2
CLOSED: 3


*/
// console.log(wss)


// now if I enter localhost:9876 there is a message: 'upgrade required'
// ws = websocket
// wss = secured websocket ~ http vs https