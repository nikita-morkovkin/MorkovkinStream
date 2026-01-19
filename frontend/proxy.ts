import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const session = request.cookies.get('morkovkin_session')?.value;

  const isAuthPage = request.nextUrl.pathname.startsWith('/account');

  if (isAuthPage) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard/settings', request.url));
    }

    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL('/account/login', request.url));
  }
}

export const config = {
  matcher: ['/account/:path*', '/dashboard/:path*'],
};
