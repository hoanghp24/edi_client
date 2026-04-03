export interface User {
  userName: string;
  title: string | null;
  email: string;
  displayName: string | null;
  manager: User | null;
  reportTo: string | null;
  department: string | null;
  userGroup: string | null;
  role?: string;
  permissions?: string[];
}

export interface AuthResponse {
  User: User;
  accessToken: string;
  refreshToken: string;
  status: string;
  message: string;
  expiresDate: string;
}

export interface LoginRequest {
  username?: string;
  password?: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

