---
title: Real Time Communication
date: 2022-08-22
tags:
  - C#
  - .NET
---

The vast majority of the web uses HTTP, which doesn't lend itself to real-time
updates. <!--excerpt-->Request-response isn't designed for clients to send data
frequently and the server can't send a response without a request, so how can it
update the client on its terms?<!--excerpt-->

## A History Lesson

We haven't always had a convenient way to update web applications in real-time.
We had some jank, then some less jank, then we got there properly.

### AJAX Polling

Using standard asynchronous requests, AJAX polling sends requests at a specific
interval to create a two-way communication channel in which both the client and
server can (optionally) send the latest data.

As above, HTTP isn't designed for this, so it's intensive to process so many
HTTP requests given their relative size and complexity.

### Long Polling

Long polling solves the intensity issue by delegating it to the server. When the
client sends a request, the server waits for an update (polling) before
responding to the client's request. Naturally, client requests can last
indefinitely.

{% caption "Long Polling example" %}

```csharp
OrderUpdate? result;

while (true)
{
  result = await orderChecker.GetUpdate(orderId);

  if (result.HasValue) { return result; }

  await Task.Delay(3000); // polling interval
}
```

{% endcaption %}

### Server Sent Events (SSE)

SSEs allow servers to send data to the client without an initial request.

<span role="heading">The Good</span>

- No repetitious additional requests reduces overhead
- Web standards
- Easy to polyfill for older browsers
- Auto-reconnection

<span role="heading">The Bad</span>

- Most browsers have ~6 connection max
  - 7 tabs and you're screwed
  - Includes Chrome and Firefox
- Only server-to-client

## Web Sockets

Web sockets are a modern, standardised approach to implement real-time
communication on the web, utilising a single TCP socket for two-way
communication.

The web socket handshake first sends a request to 'upgrade' the connection. If
the server supports web sockets, it responds with a `101` with a key to be
included in the `Accept` header in subsequent communications:

{% caption "Web Socket Handshake" %}

```
# Request
Upgrade: websocket
Connection: Upgrade

Sec-WebSocket-Key: something-unique
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Sec-WebSocket-Extensions: deflate-stream

# Response
HTTP/1.1 101 Switching Protocols

Upgrade: websocket
Connection: Upgrade

Sec-WebSocket-Accept: something-unique
Sec-WebSocket-Protocol: chat
Sec-WebSocket-Key: Extensions: deflate-stream
```

{% endcaption %}

## SignalR

SignalR is the big daddy of real-time communication on the web. It supports
polling, SSEs and web sockets, managed internally to automatically select the
best technology available. It also provides an API for Remote Procedure Call
(RPC) and scales to handle increasing traffic.

_Hubs_ are a component of SignalR; server-side classes that exchange messages
with the client. This includes a (de)serialisation protocol for parameters, JSON
by default. It also supports 'MessagePack', a binary format more compact than
JSON, and inherently faster to process.
