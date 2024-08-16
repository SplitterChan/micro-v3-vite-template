import Cache, { CacheType } from '@utils/cache';

function loginStatusVerification() {
  const validToken = Cache.publicGet('token', CacheType.Storage);
  return !!validToken;
}

function clearLoginStatus() {
  Cache.publicRemove('token');
}

export default function RouteGuard(to, _, next) {
  if (to.path === '/login') {
    clearLoginStatus();
    next();
  } else {
    if (loginStatusVerification()) {
      next();
    } else {
      // next('/login');
      next();
    }
  }
}
