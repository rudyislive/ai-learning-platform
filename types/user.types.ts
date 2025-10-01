export interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
  role: 'user' | 'admin';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  name: string;
}
