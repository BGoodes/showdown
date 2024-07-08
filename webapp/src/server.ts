import { Hono } from 'hono';
import { createBunWebSocket } from 'hono/bun';

const app = new Hono();
const { upgradeWebSocket, websocket } = createBunWebSocket();

app.get('/ws', upgradeWebSocket((c) => {
    return {
      onOpen: () => {
        console.log('Connection opened')
      },
      onMessage(event) {
        console.log(`Message from client: ${event.data}`)
      },
      onClose: () => {
        console.log('Connection closed')
      },
    }
  })
)

Bun.serve({
  fetch: app.fetch,
  port: 3000,
  websocket,
});