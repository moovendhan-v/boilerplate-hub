import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Add paths that require authentication
const protectedPaths = [
  '/dashboard',
  '/submit',
  '/api/boilerplates'
];

// Add paths that should be accessible only when NOT authenticated
const authPaths = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('auth-token')?.value;

  console.log('[Middleware] Request:', {
    path,
    hasToken: !!token,
    method: request.method
  });

  // Check if the path requires authentication
  const isProtectedPath = protectedPaths.some(prefix => path.startsWith(prefix));
  const isAuthPath = authPaths.some(prefix => path.startsWith(prefix));

  console.log('[Middleware] Route type:', {
    isProtectedPath,
    isAuthPath
  });

  // Allow all API requests to pass through - they'll be authenticated via Bearer token
  if (path.startsWith('/api/')) {
    return NextResponse.next();
  }

  try {
    if (token) {
      // Verify the token
      const decoded = verify(token, JWT_SECRET);

      // If user is authenticated and tries to access auth pages, redirect to dashboard
      if (isAuthPath) {
        console.log('[Middleware] Authenticated user accessing auth page, redirecting to dashboard');
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // For protected paths, allow access if token is valid
      if (isProtectedPath) {
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('user', JSON.stringify(decoded));

        return NextResponse.next({
          headers: requestHeaders,
        });
      }
    } else if (isProtectedPath) {
      // If no token and trying to access protected route, redirect to login
      console.log('[Middleware] Unauthorized access to protected route, redirecting to login');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (error) {
    // If token verification fails, clear the cookie and redirect to login
    console.error('[Middleware] Token verification failed:', error);
    if (isProtectedPath) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth-token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};