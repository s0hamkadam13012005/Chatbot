// src/App.jsx
import React, { useState } from 'react';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import Sidebar from './components/Sidebar';
import './App.css'

export default function App() {
  const [conversations, setConversations] = useState([
    {
      id: crypto.randomUUID(),
      title: 'First Chat',
      messages: [
        { id: '1', sender: 'user', message: 'hello chatbot' },
        { id: '2', sender: 'robot', message: 'Hello! How can I help you?' },
      ],
    },
  ]);

  const [currentChatId, setCurrentChatId] = useState(conversations[0].id);

  function onNewChat() {
    const newChat = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
    };
    setConversations([newChat, ...conversations]);
    setCurrentChatId(newChat.id);
  }

  function onSend(userMessage, botMessage) {
    setConversations((prevConvos) =>
      prevConvos.map((chat) =>
        chat.id === currentChatId
          ? { ...chat, messages: [...chat.messages, userMessage, botMessage] }
          : chat
      )
    );
  }

  const currentChat = conversations.find((c) => c.id === currentChatId);

  return (
    <div className="main-layout">
      <Sidebar
        onNewChat={onNewChat}
        conversations={conversations}
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
      />
      <div className="chat-container">
        <div className="app-container">
          <ChatMessages messages={currentChat.messages} />
          <ChatInput onSend={onSend} />
        </div>
      </div>
    </div>
  );
}
