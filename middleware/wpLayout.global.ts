// middleware/wpLayout.global.ts
export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/k-admin/')) {
    return; // Skip for non-k-admin routes
  }

  const { accessToken, refreshToken, refreshAccessToken, updateLastActivity, isInactiveForTooLong, logout } = useAuth();

  // Check for inactivity (1 hour without using refresh token)
  if (refreshToken.value && isInactiveForTooLong()) {
    logout(); // Clear cookies and redirect to login
    return;
  }

  // If no access token and not on login page, try refreshing or redirect
  if (!accessToken.value && to.path !== '/k-admin/login') {
    if (refreshToken.value) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        updateLastActivity(); // Update activity after successful refresh
        return; // Continue to the requested page
      }
    }
    return navigateTo('/k-admin/login');
  }

  // Redirect to dashboard if logged in and trying to access login
  if (accessToken.value && to.path === '/k-admin/login') {
    return navigateTo('/k-admin/dashboard');
  }

  // Set layout for k-admin routes (except login)
  if (to.path !== '/k-admin/login') {
    to.meta.layout = 'wp';
  }

  updateLastActivity();
});