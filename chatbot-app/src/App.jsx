// src/App.jsx
import React, {  useEffect, useState } from 'react';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import Sidebar from './components/Sidebar';
import './App.css'

export default function App() {
  const [conversations, setConversations] = useState (()=>{
    const savedConvos = localStorage.getItem('chatbot-conversations');

    return savedConvos ? JSON.parse(savedConvos) : [{
      id: crypto.randomUUID(),
    title: 'First Chat',
    messages: [
      { id: '1', sender: 'user', message: 'hello chatbot' },
      { id: '2', sender: 'robot', message: 'Hello! How can I help you?' },
    ],
    }]
  })


  useEffect(()=>{
    localStorage.setItem('chatbot-conversations', JSON.stringify(conversations));
  },[conversations])

  const [currentChatId, setCurrentChatId] = useState(()=>{
    return localStorage.getItem('chatbot-currentChatId') || conversations[0].id;
  });

  useEffect(() => {
  localStorage.setItem('chatbot-currentChatId', currentChatId);
}, [currentChatId]);

  const [darkmode , setDarkMode] = useState(()=>{
    const stored = localStorage.getItem('current-darkmode');
     return stored == 'true';
  })

  useEffect(()=>{
    localStorage.setItem('current-darkmode',darkmode);
  },[darkmode])
 
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

     function toggleDarkMode() {
    setDarkMode(!darkmode);
 // console.log("Dark mode state:", !darkmode);
  }

  const currentChat = conversations.find((c) => c.id === currentChatId);

  return (
    <div className={`main-layout ${darkmode ? 'dark-mode' : ''}`}>
      <Sidebar
        onNewChat={onNewChat}
        conversations={conversations}
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
        toggleDarkMode={toggleDarkMode}
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
