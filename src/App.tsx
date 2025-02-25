import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';
import { UserList } from './components/UserList';
import { JoinChat } from './components/JoinChat';
import { useChatStore } from './store/chatStore';
import type { Message, User } from './types';
import { MessageSquareText } from 'lucide-react';

// Initialize socket connection with dynamic host
const socket = io(window.location.hostname === 'localhost' ? 'http://localhost:3000' : window.location.origin, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
});

function App() {
  const { currentUser, setCurrentUser, addMessage, setUsers } = useChatStore();
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    socket.on('connect', () => {
      setConnected(true);
      setError(null);
      if (currentUser) {
        socket.emit('join', currentUser);
      }
    });

    socket.on('connect_error', () => {
      setError('Failed to connect to chat server');
    });

    socket.on('message', (message: Message) => {
      addMessage(message);
    });

    socket.on('users', (users: User[]) => {
      setUsers(users);
    });

    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('message');
      socket.off('users');
    };
  }, [addMessage, setUsers, currentUser]);

  const handleJoin = (username: string) => {
    const user: User = { id: socket.id, username };
    socket.emit('join', user);
    setCurrentUser(user);
  };

  const handleSendMessage = (text: string) => {
    if (!currentUser) return;

    const message: Message = {
      id: crypto.randomUUID(),
      text,
      username: currentUser.username,
      timestamp: Date.now(),
    };

    socket.emit('message', message);
    addMessage(message);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full mx-4">
          <div className="text-red-500 mb-4">
            <MessageSquareText size={48} className="mx-auto" />
          </div>
          <p className="text-xl text-red-600 font-semibold mb-4">{error}</p>
          <p className="text-gray-600">Please make sure the chat server is running and try again.</p>
        </div>
      </div>
    );
  }

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Connecting to server...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <JoinChat onJoin={handleJoin} />;
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="flex-1 flex flex-col max-w-5xl mx-auto shadow-2xl">
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquareText className="text-blue-500" size={24} />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Chat Room
            </h1>
          </div>
          <div className="text-sm text-gray-600">
            Welcome, <span className="font-semibold">{currentUser.username}</span>
          </div>
        </div>
        <div className="flex-1 flex">
          <div className="flex-1 flex flex-col bg-white">
            <MessageList />
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
          <UserList />
        </div>
      </div>
    </div>
  );
}

export default App;