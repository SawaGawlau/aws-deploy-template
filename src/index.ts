import * as WebSocket from 'ws'
import express, {Application, Request} from 'express';


// npm install websocket-ts 
// https://github.com/jjxxs/websocket-ts#readme
import {WebsocketBuilder} from 'websocket-ts'

// export enum WebsocketEvents {
//     open = 'open',          // Connection is opened or re-opened
//     close = 'close',        // Connection is closed
//     error = 'error',        // An error occurred
//     message = 'message',    // A message was received
//     retry = 'retry'         // A try to re-connect is made
// }
// const ws = new WebsocketBuilder('ws://localhost:42421')
//     .onOpen((i, ev) => { console.log("opened") })
//     .onClose((i, ev) => { console.log("closed") })
//     .onError((i, ev) => { console.log("error") })
//     // multiple callbacks for same event
//     .onMessage((i, e) => { console.log("echo sent") })
//     .onMessage((i, e) => { i.send(e.data) })
//     .onMessage((i, e) => { console.log("message received") })
//     .onRetry((i, ev) => { console.log("retry") })
//     .build();

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
    })
