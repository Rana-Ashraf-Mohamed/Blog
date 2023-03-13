import { UserAttributes } from '../models/User';

export interface UserData {
    id: number;
    name: string;
    email: string;
    isVerified: boolean;
}


export interface LoginResponse {
    user: UserData;
    token: string;

}