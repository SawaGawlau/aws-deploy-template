const WebSocket = require('ws')
const express = require('express')
const app = express()
const path = require('path')

app.use('/', express.static(path.resolve(__dirname, '../client')))

const server = app.listen(9876)
// it looks like we are listening on the same port but what we want to do
// when we are having the connection o port 9876 as ws connection
// we want to use ws server, and when we have regular connection 
// we want to use http server(express)
const wss = new WebSocket.Server({
    noServer: true, //server: server,
    // path: '/websockets'
    // verifyClient is function to authenticate whetever a client can communicate or not
    // verifyClient: (info) => {
    //     return true // will accept the 'handshake' and connect
    // } 
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
    // we listen for an upgrade event, once it is emited we let wss to emit connection event on out wss 
    server.on('upgrade', async function upgrade(request, socket, head) {
        // this is regular raw socket, not websocket
        // do what you normally do in 'verifyClient() here and then use 
        // 'WebSocketServer.prototype.handleUpgrade()'

        // test for authentication
        if (Math.random() > 0.5 ) {
            // to not leave ws status as pending - we want to end it:
            return socket.end('HTTP/1.1 401 Unauthorized\r\n', 'ascii')
        }
        
       

        // handleUpgrade passes connection to our ws Server
        /*
        as you have already created the server using express and the handleUpgrade method 
        is called inside express, so you need to inform your WebSocket server to ignore 
        the server initiating part and continue with the existing resource 
        as giving the options as { noServer: true }
        */
        wss.handleUpgrade(request, socket, head, function done(ws){
            wss.emit('connection', ws, request) //, ...args
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