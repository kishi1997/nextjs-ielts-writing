export { auth as proxy } from '@/lib/auth';
// 現状仮のミドルウェア
export const config = {
  // /dashboard だけログイン必須にしたい」という場合は、config.matcher を使ってパスを絞り込みます。
  matcher: ['/dashboard/:path*'],
};
