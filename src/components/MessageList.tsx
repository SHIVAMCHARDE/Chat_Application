import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../store/chatStore';

export const MessageList: React.FC = () => {
  const { messages, currentUser } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
      <div className="space-y-4 max-w-4xl mx-auto">
        {messages.map((message) => {
          const isCurrentUser = message.username === currentUser?.username;
          return (
            <div
              key={message.id}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-sm ${
                  isCurrentUser
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-100 text-gray-900'
                }`}
              >
                <div className={`text-sm font-semibold mb-1 ${
                  isCurrentUser ? 'text-blue-50' : 'text-gray-600'
                }`}>
                  {isCurrentUser ? 'You' : message.username}
                </div>
                <p className="leading-relaxed">{message.text}</p>
                <div className={`text-xs mt-1 ${
                  isCurrentUser ? 'text-blue-100' : 'text-gray-400'
                }`}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};