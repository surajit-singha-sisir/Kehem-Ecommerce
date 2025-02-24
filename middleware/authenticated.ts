// middleware/authenticated.ts
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  const loggedIn = authStore.token !== null;

  if (!loggedIn) {
    return navigateTo('/login');
  }
});
