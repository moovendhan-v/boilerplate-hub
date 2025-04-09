import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Add paths that require authentication
const protectedPaths = [
  // '/dashboard',
  // '/submit',
  '/api/boilerplates'
];

// Add paths that should be accessible only when NOT authenticated
const authPaths = ['/login', '/signup'];


export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // Check for Bearer token in Authorization header first
  const authHeader = request.headers.get('Authorization');
  const headers = request.headers
  console.log('[Middleware] Authorization header:', headers);
  let token: string | null | undefined = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
  
  // If no Bearer token found, check for cookie token
  if (!token) {
    token = request.cookies.get('auth-token')?.value;
  }

  console.log('[Middleware] Request:', {
    path,
    hasToken: !!token,
    method: request.method,
    authType: authHeader ? 'Bearer' : token ? 'Cookie' : 'None'
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
      try {
        // Verify the token
        const decoded = verify(token, JWT_SECRET);

        // Set user info in headers for all requests
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('user', JSON.stringify(decoded));

        // If user is authenticated and tries to access auth pages, redirect to dashboard
        if (isAuthPath) {
          console.log('[Middleware] Authenticated user accessing auth page, redirecting to dashboard');
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        // For all other paths (protected or not), allow access with user info
        return NextResponse.next({
          headers: requestHeaders,
        });
      } catch (verifyError) {
        // If token verification fails, clear the cookie and only redirect if accessing protected path
        console.error('[Middleware] Token verification failed:', verifyError);
        const response = isProtectedPath
          ? NextResponse.redirect(new URL('/login', request.url))
          : NextResponse.next();
        response.cookies.delete('auth-token');
        return response;
      }
    } else if (isProtectedPath) {
      // If no token and trying to access protected route, redirect to login
      console.log('[Middleware] Unauthorized access to protected route, redirecting to login');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (error) {
    // Handle any other errors
    console.error('[Middleware] Unexpected error:', error);
    if (isProtectedPath) {
      return NextResponse.redirect(new URL('/login', request.url));
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