export interface AuthUserInterface {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponseInterface {
  token: string;
  user: AuthUserInterface;
}

export interface RegisterResponseInterface {}

export interface LogoutResponseInterface {}