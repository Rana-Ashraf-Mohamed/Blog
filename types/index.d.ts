declare namespace Express {
    export interface Request {
        user: import('../interfaces/auth.interface').UserData;
    }
}