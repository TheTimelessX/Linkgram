export type ChatTypes = "User" | "Group";

export interface Chat {
    type: ChatTypes;
    id: number;
    chat_photo_id: string;
    title?: string;
    first_name?: string;
    last_name?: string;
}