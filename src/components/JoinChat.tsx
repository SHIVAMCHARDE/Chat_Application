import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

interface JoinChatProps {
  onJoin: (username: string) => void;
}

export const JoinChat: React.FC<JoinChatProps> = ({ onJoin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onJoin(username);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-blue-500 text-white p-4 rounded-2xl">
            <MessageSquare size={40} />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          Welcome to Chat Room
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Connect with others in real-time conversation
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Choose your username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your username"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!username.trim()}
          >
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
};