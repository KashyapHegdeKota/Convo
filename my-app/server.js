// my-app/server.js
const { WebSocketServer, WebSocket } = require("ws");

const wss = new WebSocketServer({ port: 8080 });

// A simple in-memory store for rooms and their clients
const rooms = {};

console.log("WebSocket server started on port 8080");

wss.on("connection", (ws) => {
  console.log("A new client connected!");

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    const { type, sessionID, content } = data;

    // Handle joining a room
    if (type === "join") {
      console.log(`Client is joining room: ${sessionID}`);
      // If room doesn't exist, create it
      if (!rooms[sessionID]) {
        rooms[sessionID] = [];
      }
      // Add the client to the room
      rooms[sessionID].push(ws);
      // Store the sessionID on the ws connection for later cleanup
      ws.sessionID = sessionID;
    }

    // Handle broadcasting a message
    if (type === "message") {
      console.log(`Message received for room ${sessionID}: ${content}`);
      const room = rooms[sessionID];
      if (room) {
        // Broadcast the message to all clients in the same room
        room((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "message", content: content }));
          }
        });
      }
    }
  });

  ws.on("close", () => {
    console.log("Client has disconnected");
    const sessionID = ws.sessionID;
    // If the client was in a room, remove them
    if (sessionID && rooms[sessionID]) {
      rooms[sessionID] = rooms[sessionID].filter((client) => client !== ws);

      // Optional: If the room is now empty, delete it
      if (rooms[sessionID].length === 0) {
        console.log(`Room ${sessionID} is now empty and has been closed.`);
        delete rooms[sessionID];
      }
    }
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});
