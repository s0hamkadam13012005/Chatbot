// src/components/Sidebar.jsx
import React from 'react';
import './Sidebar.css'
export default function Sidebar({ conversations, currentChatId, setCurrentChatId, onNewChat, toggleDarkMode , deleteChat}) {
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
           <span>{chat.title || 'Untitled Chat'}</span>

              <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent click
                deleteChat(chat.id);
              }}
              title="Delete Chat"
            >
              🗑
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
