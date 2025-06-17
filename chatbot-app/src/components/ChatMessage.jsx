// src/components/ChatMessage.jsx
//import React from 'react';
import './ChatMessage.css'

export default function ChatMessage({ sender, message }) {
  return (
    <div className={sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}>
      {sender === 'robot' && <img src="robot.png" className="chat-message-profile" />}
      <div className="chat-message-text">{message}</div>
      {sender === 'user' && <img src="user.png" className="chat-message-profile" />}
    </div>
  );
}
