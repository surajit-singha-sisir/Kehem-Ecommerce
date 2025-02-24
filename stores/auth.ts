import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null, // ✅ Explicit type for token
  }),

  actions: {
    setToken(accessToken: string) {
      this.token = accessToken;  // ✅ Now TypeScript should allow this
      localStorage.setItem('auth_token', accessToken); // Save token to localStorage
    },

    logout() {
      this.token = null;
      localStorage.removeItem('auth_token'); // Clear token from localStorage
    },

    loadToken() {
      this.token = localStorage.getItem('auth_token'); // Load token from localStorage
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.token, // Return true if token exists
  }
});
