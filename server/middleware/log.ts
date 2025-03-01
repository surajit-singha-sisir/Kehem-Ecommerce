export default defineEventHandler((event) => {
  console.log(`[${new Date().toISOString()}] ${getMethod(event)} ${getRequestURL(event)}`);
});