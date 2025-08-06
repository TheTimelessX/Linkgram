export interface User {
    first_name: string;
    last_name: string;
    username: string;
    profile_photo_id: string;
    id: number;
}

export interface SensetiveUser extends User {
    auth_token: string;
}