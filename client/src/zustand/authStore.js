import {create} from 'zustand';
import { jwtDecode } from "jwt-decode";

const useAuthStore = create((set) => {
  const storedToken = localStorage.getItem('token');
  const initialState = {
    user: storedToken ? jwtDecode(storedToken) : null,
    isAuthenticated: !!storedToken,
  };

  return {
    ...initialState,

    login: (token) => {
      set(() => ({ user: jwtDecode(token), isAuthenticated: true }));
      localStorage.setItem('token', token);
    },

    logout: () => {
      set(() => ({ user: null, isAuthenticated: false }));
      localStorage.removeItem('token');
    },
  };
});

export default useAuthStore;