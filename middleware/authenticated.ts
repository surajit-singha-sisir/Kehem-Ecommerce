import { useAuthStore } from '~/stores/auth';
import { useCookies } from 'vue3-cookies';

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  const { cookies } = useCookies();

  // Check if the token is in the cookies or store
  const token = cookies.get('auth_token') || authStore.token;

  if (!token) {
    return navigateTo('/login');
  }
  
  // Optional: Validate token on the backend if needed
});
