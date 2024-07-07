const server = Bun.serve({
    port: 3000,
    
    fetch(req, server) {
      if (server.upgrade(req)) {
        return;
      }
      return new Response("Upgrade failed", { status: 500 });
    },

    websocket: {
      open(ws) {
        console.log("New connection opened");
      },

      message(ws, message) {},

      close(ws) {
        console.log("Connection closed");
      },
    },

  });
  
  console.log(`Listening on localhost:${server.port}`);