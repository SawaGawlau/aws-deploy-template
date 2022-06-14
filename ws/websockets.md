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
