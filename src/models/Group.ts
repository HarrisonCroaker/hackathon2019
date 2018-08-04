import { Message } from './Message';

export interface Group {
    id: string;
    name: string;
    leader: string;
    members: any;
    type: string;
}
