// src/components/ChatInput.jsx
import React, { useState } from 'react';
import './ChatInput.css'

export default function ChatInput({ onSend }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage() {
    if (isLoading || inputText === '') return;

    setIsLoading(true);

    const userMessage = {
      message: inputText,
      sender: 'user',
      id: crypto.randomUUID(),
    };

    const response = await window.Chatbot.getResponseAsync(inputText);

    const botMessage = {
      message: response,
      sender: 'robot',
      id: crypto.randomUUID(),
    };

    onSend(userMessage, botMessage);
    setInputText('');
    setIsLoading(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') sendMessage();
  }

  return (
    <div className="chat-input-container">
      <input
        className="chat-input"
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
        onKeyDown={handleKeyDown}
      />
      <button className="send-button" onClick={sendMessage}>Send</button>
    </div>
  );
}
