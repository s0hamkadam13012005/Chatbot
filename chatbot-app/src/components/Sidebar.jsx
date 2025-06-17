// src/components/Sidebar.jsx
import React from 'react';
import './Sidebar.css'
export default function Sidebar({ conversations, currentChatId, setCurrentChatId, onNewChat, toggleDarkMode }) {
  return (
    <div className="sidebar">
      <h2>Chatbot Menu</h2>
      <div className="sidebar-buttons">
<button onClick={onNewChat}>New-Chat</button>

<button 
onClick={toggleDarkMode}
className='darkmode-button'><img src='darkmode.svg' alt="Toggle dark mode"/></button>
      </div>
      
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
