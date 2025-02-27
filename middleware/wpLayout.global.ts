// middleware/auto-layout.ts
export default defineNuxtRouteMiddleware((to) => {
  const accessToken = useCookie<string | null>('access').value

  if (!accessToken && to.path !== '/k-admin/login') {
    return navigateTo('/k-admin/login')
  }

  if (accessToken && to.path == '/k-admin/login') {
    return navigateTo('/k-admin/')
  }

  if (to.path.startsWith('/k-admin/') && to.path !== '/k-admin/login') {
    to.meta.layout = 'wp';
  }

});
