// src/zustand/authStore.js
import {create} from 'zustand';
import AuthService from '../../../server/services/authService';

const useAuthStore = create((set) => ({
  user: null,
  loginUser: async (userData) => {
    try {
      const token = await AuthService.login(userData);
      set({ user: { username: userData.username, token } });
    } catch (error) {
      console.error('Login error:', error.message);
      throw new Error('Login failed.');
    }
  },
  logoutUser: () => set({ user: null }),
  registerUser: async (userData) => {
    try {
      const newUser = await AuthService.signup(userData);
      set({ user: newUser });
    } catch (error) {
      console.error('Signup error:', error.message);
      throw new Error('Signup failed.');
    }
  },
}));

export default useAuthStore;
