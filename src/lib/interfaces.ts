export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    userId: number;
    username: string;
    email: string;
}

export interface SignupPayload {
    username: string;
    email: string;
    password?: string;
    firstName?: string;
    lastName?: string;
}

