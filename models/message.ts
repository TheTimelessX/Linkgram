import { User, SensetiveUser } from "./user";
import { Chat } from "./chat";

export interface Message {
    text: string;
    from_id: number; // this will remove in returning data, its all about getting information about sender
    from: User;
    id: number;
    chat: Chat;
}

export interface SensetiveMessage extends Message {
    from: SensetiveUser;
}