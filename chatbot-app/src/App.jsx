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
      prevConvos.map((chat) => {
      if (chat.id === currentChatId) {
        const isTitleEmpty = !chat.title || chat.title === 'New Chat' || chat.title === 'Untitled Chat';
        const updatedTitle = isTitleEmpty ? userMessage.message.slice(0, 20) + '...' : chat.title;

        return {
          ...chat,
          title: updatedTitle,
          messages: [...chat.messages, userMessage, botMessage]
        };
      }
      return chat;
    })
  );
}

     function toggleDarkMode() {
    setDarkMode(!darkmode);
 // console.log("Dark mode state:", !darkmode);
  }

  function deleteChat(chatId){

    const updatedConvos = conversations.filter(chat => chat.id !== chatId);
    setConversations(updatedConvos);

   if (updatedConvos.length === 0) {
    // Create a brand new chat if no chats are left
    const newChat = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: []
    };

    setConversations([newChat]);
    setCurrentChatId(newChat.id);
    return; // early return so it doesn't go further
  }

  if (chatId === currentChatId) {
    setCurrentChatId(updatedConvos[0].id);
  }

  setConversations(updatedConvos);

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
        deleteChat={deleteChat}
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
