export interface NewUser {
    name: string;
    surname: string;
    email: string;
    password: string;
}

export interface User extends NewUser {
    id: number;
    role: UserRole;
}

export type UserRole = 'admin' | 'user';
