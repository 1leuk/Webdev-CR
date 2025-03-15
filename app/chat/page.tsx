"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io();

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data.reverse()));

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const msg = { user: "User1", message: input };
    socket.emit("sendMessage", msg);
    
    await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify(msg),
      headers: { "Content-Type": "application/json" },
    });

    setInput("");
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        {messages.map((msg, index) => (
          <p key={index} className="p-2 bg-gray-700 rounded my-1">
            <strong>{msg.user}:</strong> {msg.message}
          </p>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 border rounded w-full"
        placeholder="Type a message..."
      />
      <button onClick={sendMessage} className="mt-2 p-2 bg-blue-500 text-white">
        Send
      </button>
    </div>
  );
}
