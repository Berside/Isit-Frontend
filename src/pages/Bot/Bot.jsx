import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import './Bot.css';
import { ByeBye } from '../../http/aI';

const saveMessagesToLocalStorage = (messages) => {
  localStorage.setItem('chatMessages', JSON.stringify(messages));
};

const loadMessagesFromLocalStorage = () => {
  const savedMessages = localStorage.getItem('chatMessages');
  return savedMessages ? JSON.parse(savedMessages) : [];
};

const Assistant = observer(() => {
  const [messages, setMessages] = useState(loadMessagesFromLocalStorage());
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('chatMessages');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        150
      )}px`;
    }
  }, [userInput]);

  const getAssistantMessageHeight = (text) => {
    const lineCount = text.split('\n').length;
    const approxCharsPerLine = 50;
    const lines = Math.ceil(text.length / approxCharsPerLine) + lineCount - 1;
    const calculatedHeight = Math.max(lines * 20, 60);
    return `${Math.min(calculatedHeight, 100)}px`;
  };

  const handleSend = async () => {
    if (!userInput.trim()) return;
    
    const userMessage = { text: userInput, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput('');
    setIsTyping(true);

    try {
      const response = await ByeBye(userInput);
      const assistantMessage = { text: response.response, sender: 'assistant' };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Ошибка при запросе к API:', error);
      const errorMessage = { 
        text: 'Произошла ошибка. Попробуйте еще раз.', 
        sender: 'assistant' 
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="assistant-container">
      <div className="assistant">
        <div className="messages">
          {messages.length === 0 ? (
            <div className="welcome-message">
              <h3>Добро пожаловать в ассистент!</h3>
              <p>Задайте мне любой вопрос, и я постараюсь помочь.</p>
            </div>
          ) : (
            <>
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}
                  style={msg.sender === 'assistant' ? { 
                    minHeight: getAssistantMessageHeight(msg.text),
                    height: 'auto'
                  } : {}}
                >
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="messageassistanttyping-indicator">
                  <div className="typing-dots">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-area">
          <textarea
            ref={textareaRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Задайте вопрос..."
            rows={1}
          />
          <button onClick={handleSend} disabled={!userInput.trim()}>
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
});

export default Assistant;