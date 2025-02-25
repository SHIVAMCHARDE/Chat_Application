import React from 'react';
import { Users } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

export const UserList: React.FC = () => {
  const { users } = useChatStore();

  return (
    <div className="w-72 bg-white border-l">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Users size={20} className="text-blue-500" />
          <h2 className="font-semibold text-gray-700">Online Users</h2>
        </div>
        <p className="text-sm text-gray-500 mt-1">{users.length} online</p>
      </div>
      <div className="p-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="relative">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-gray-700 font-medium">{user.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};