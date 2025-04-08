'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

const publicRoutes = ['/', '/login', '/signup'];
const adminRoutes = ['/admin'];

export default function RouteGuard({
  children,
  requireAuth = false,
  requireAdmin = false,
}: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    console.log('[RouteGuard] Authentication state:', {
      isAuthenticated,
      user,
      pathname,
      requireAuth,
      requireAdmin
    });
    
    if (!pathname) return;

    // Allow access to public routes
    if (publicRoutes.includes(pathname)) {
      console.log('[RouteGuard] Accessing public route:', pathname);
      return;
    }

    // Redirect to login if authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      console.log('[RouteGuard] Unauthorized access, redirecting to login');
      router.push('/login');
      return;
    }

    // Redirect to dashboard if user is authenticated but accessing login/signup pages
    if (isAuthenticated && (pathname === '/login' || pathname === '/signup')) {
      console.log('[RouteGuard] Authenticated user accessing auth pages, redirecting to dashboard');
      router.push('/dashboard');
      return;
    }

    // Check admin access
    if (requireAdmin || adminRoutes.some(route => pathname.startsWith(route))) {
      console.log('[RouteGuard] Checking admin access:', { isAdmin: user?.role === 'admin' });
      if (!isAuthenticated || user?.role !== 'admin') {
        console.log('[RouteGuard] Unauthorized admin access, redirecting to dashboard');
        router.push('/dashboard');
        return;
      }
    }
  }, [pathname, isAuthenticated, user, router, requireAuth, requireAdmin]);

  return <>{children}</>;
}