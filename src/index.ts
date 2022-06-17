import * as WebSocket from 'ws'
import express, {Application, Request} from 'express';
import { WsServer, JsonParser } from 'ws-builder'
import * as WS from 'ws'

// import * as http from 'http'

const app: Application = express();

const path = require('path')

app.use('/', express.static(path.resolve(__dirname, '../client')))

const server = app.listen(9876)
const wss = new WebSocket.Server({
    noServer: true, 
})
console.log('websocket ready')
    const clients = []

    wss.on('connection', (ws: WebSocket) => {
        clients.push(ws)
        ws.on('message', (message: string) => {
            const messToString = JSON.parse(message) 
            console.log('received: %s', messToString)
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(messToString)
                }
            })
        })
        ws.on('open', () => {
            ws.send(JSON.stringify({
              key: 'message',
              data: {
                some: 'websocket has been opened'
              }
            }))
    })
  
    server.on('upgrade', async function upgrade(request, socket, head) {
        if (Math.random() > 1) {
            return socket.end('HTTP/1.1 401 Unauthorized\r\n', 'ascii')
        }
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