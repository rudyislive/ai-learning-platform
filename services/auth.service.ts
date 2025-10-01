import api from './api';
import { User, LoginCredentials, SignupCredentials } from '@/types/user.types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  },

  async signup(credentials: SignupCredentials): Promise<{ user: User; token: string }> {
    const response = await api.post('/api/auth/signup', credentials);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/api/auth/logout');
    localStorage.removeItem('token');
  },

  async googleAuth(token: string): Promise<{ user: User; token: string }> {
    const response = await api.post('/api/auth/google', { token });
    return response.data;
  },
};
