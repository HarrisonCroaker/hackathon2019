import { User } from './User';

export interface Message {
  id?: string;
  timestamp: string;
  type: string;
  message: string;
  user: User;
}
