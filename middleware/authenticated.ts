export default defineNuxtRouteMiddleware((to, from) => {
  const accessToken = useCookie<string | null>('access').value

  if (!accessToken && to.path !== '/login') {
    return navigateTo('/login')
  }
})
