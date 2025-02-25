export interface Message {
  id: string;
  text: string;
  username: string;
  timestamp: number;
}

export interface User {
  id: string;
  username: string;
}