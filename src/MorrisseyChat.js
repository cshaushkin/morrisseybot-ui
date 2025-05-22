// src/MorrisseyChat.js
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function MorrisseyChat() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
const response = await fetch("https://morrisseybot-backend.onrender.com/api/morrissey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    setReply(data);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: "1rem" }}>
      <h1>MorrisseyBot</h1>
      <textarea
        placeholder="Ask something bleak..."
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "100%", padding: "0.5rem" }}
      />
      <button onClick={sendMessage} style={{ marginTop: "1rem" }}>
        Speak, Morrissey
      </button>

      {loading && <p>Summoning despair...</p>}

      {reply && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            marginTop: "2rem",
            background: "#f4f4f4",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <p><em>{reply.reply}</em></p>
          <p>— <strong>{reply.song}</strong>, <span>{reply.album}</span></p>
        </motion.div>
      )}
    </div>
  );
}