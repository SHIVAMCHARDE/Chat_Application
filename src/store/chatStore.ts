import { create } from 'zustand';
import { Message, User } from '../types';

interface ChatState {
  messages: Message[];
  users: User[];
  currentUser: User | null;
  addMessage: (message: Message) => void;
  setUsers: (users: User[]) => void;
  setCurrentUser: (user: User) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  users: [],
  currentUser: null,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setUsers: (users) => set({ users }),
  setCurrentUser: (user) => set({ currentUser: user }),
}));