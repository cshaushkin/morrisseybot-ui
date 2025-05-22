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
    try {
      const response = await fetch("https://morrisseybot-backend-2.onrender.com/api/morrissey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error("Backend error");

      const data = await response.json();
      setReply(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setReply({ reply: "Morrissey is brooding silently.", song: "", album: "", email: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: "1rem" }}>
      <h1>MorrisseyBot</h1>
      <textarea
        placeholder="Ask Morrissey something existential..."
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
      />
      <button
        onClick={sendMessage}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem", fontSize: "1rem" }}
      >
        Summon Morrissey
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
          <p><strong>Lyric:</strong></p>
          <p><em>{reply.reply}</em></p>
          {reply.song && (
            <p>— <strong>{reply.song}</strong>{reply.album ? `, ${reply.album}` : ""}</p>
          )}
          {reply.email && (
            <>
              <hr style={{ margin: "1rem 0" }} />
              <p><strong>From Morrissey:</strong></p>
              <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
                {reply.email}
              </pre>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}