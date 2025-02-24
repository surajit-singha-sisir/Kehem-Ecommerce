// stores/auth.js
import { defineStore } from 'pinia';
import { useCookie } from '#app';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: useCookie('auth-token'),  // Use cookie for token persistence
  }),
  actions: {
    
    setToken(token) {
      this.token = token;
      useCookie('auth-token').value = token;  // Set the token in the cookie
    },
    logout() {
      this.token = null;
      useCookie('auth-token').value = '';  // Clear the cookie
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
