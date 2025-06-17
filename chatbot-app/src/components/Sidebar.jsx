// src/components/Sidebar.jsx
import React from 'react';
import './Sidebar.css'
export default function Sidebar({ conversations, currentChatId, setCurrentChatId, onNewChat }) {
  return (
    <div className="sidebar">
      <h2>Chatbot Menu</h2>
      <button onClick={onNewChat}>New Chat</button>
      <ul className="sidebar-list">
        {conversations.map((chat) => (
          <li
            key={chat.id}
            className={chat.id === currentChatId ? 'active-chat' : ''}
            onClick={() => setCurrentChatId(chat.id)}
          >
            {chat.title || 'Untitled Chat'}
          </li>
        ))}
      </ul>
    </div>
  );
}
