// src/app/join/[sessionID]/page.js
"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";

export default function JoinPage() {
  // 1. Read the Session ID from the URL
  const params = useParams();
  const sessionID = params.sessionID;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null); // Use useRef to hold the WebSocket instance
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    // We can't connect until we have the sessionID from the URL
    if (!sessionID) return;

    // 2. Connect to the WebSocket Server
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL);
    ws.current = socket; // Store the socket in the ref

    // Event handler for when the connection is established
    socket.onopen = () => {
      console.log("WebSocket connection established.");
      setIsConnected(true);

      // 🧠 Send a "join room" signal to the server using the sessionId
      const joinMessage = {
        type: "join",
        sessionID: sessionID,
      };
      socket.send(JSON.stringify(joinMessage));
    };

    // Event handler for receiving messages from the server
    socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      // We expect the server to broadcast messages with a 'content' field
      if (receivedMessage.type === "message") {
        setMessages((prev) => [...prev, receivedMessage.content]);
      }
    };

    // Event handler for when the connection closes
    socket.onclose = () => {
      console.log("WebSocket connection closed.");
      setIsConnected(false);
    };

    // Event handler for any errors
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup function: close the connection when the component unmounts
    return () => {
      if (socket.readyState === 1) {
        // <-- This is important
        socket.close();
      }
    };
  }, [sessionID]); // Rerun effect if sessionID changes

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !input.trim() ||
      !ws.current ||
      ws.current.readyState !== WebSocket.OPEN
    ) {
      return;
    }

    // Create a message object to send to the server
    const messagePayload = {
      type: "message",
      content: input,
      sessionID: sessionID,
    };

    ws.current.send(JSON.stringify(messagePayload));
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white p-4 border-b text-center">
        <h1 className="text-xl font-semibold">Chat Room</h1>
        <p className="text-sm text-gray-500">
          Status:{" "}
          <span className={isConnected ? "text-green-500" : "text-red-500"}>
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Session ID:{" "}
          <span className="font-mono bg-gray-100 p-1 rounded">{sessionID}</span>
        </p>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="bg-blue-100 text-blue-800 p-3 rounded-lg max-w-xs break-words"
          >
            {msg}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <footer className="bg-white p-4 border-t">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            disabled={!isConnected}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            disabled={!isConnected || !input.trim()}
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}
