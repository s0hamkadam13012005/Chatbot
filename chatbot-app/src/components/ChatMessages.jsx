// src/components/ChatMessages.jsx
import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import './ChatMessages.css'

export default function ChatMessages({ messages }) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {messages.map((msg) => (
        <ChatMessage key={msg.id} {...msg} />
      ))}
    </div>
  );
}
