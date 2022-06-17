window object has a property WebSocket:

window.WebSocket => this is a function which allows you to pass the url and allows websocket connection

why do we need ws?

```
> const ws = new WebSocket(`ws://127.0.0.1:9876`)

> ws.onmessage = function(event) {
  console.debug("WebSocket message received:", event);
};

> ws.send(JSON.stringify('hello server, whats up ?'))

```
why websockets are NOT scalable?

explanation: 
```
https://www.youtube.com/watch?v=xtCddOjITvo
```

vertical - for hardware  - increase in processing power (RAM & CPU) 
its not effective for web scale services

horizontal -  adding additional nodes or machines to your infrastructure to cope with new demands. If you are hosting an application on a server and find that it no longer has the capacity or capabilities to handle traffic, adding a server may be your solution.


WS are not horizontal scalable

HTTP - request/response system
client requests
server responses

WebSockets - uses http protocol as vehicle to send req/res between server and client
statefull - awareness between server and client 

instead of http request we do websocket handshake - initiation of websocket connection - binary protocol - it's detached from http and then after connection anyone can send data to anyone.

HANDSHAKE -> ws:// or wss://
first request is http GET request than means when we make that request we make GET 1.1 UPGRADE ->
when server knows that client tries to upgrade the server connection to something else (like websocket) 
the server will reply 101 - switching protocols

from client:

GET /name HTTP /1.1
data...

from server:
HTTP/1.1 101 Switching Protocols

screenshot from 15.06


WebSockets use cases
-> chatting
-> live feed
-> multiplayer gaming
-> showing client progress/logging