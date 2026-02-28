import { auth } from '@/lib/auth';

export default auth((req) => {
  // ⭐ここでauthを呼び出すと、サーバー側でセッション情報が取得できます。
  const isLoggedIN = !!req.auth;
  console.log('login or not', isLoggedIN);
  const { pathname } = req.nextUrl;
  if (!isLoggedIN && pathname !== 'login') {
    return Response.redirect(new URL('login', req.nextUrl));
  }
  if ((isLoggedIN && pathname === '/') || pathname === '/login') {
    return Response.redirect(new URL('/dashboard', req.nextUrl));
  }
});
// 現状仮のミドルウェア
export const config = {
  matcher: ['/', '/dashboard', '/dashboard/:path*'],
};
