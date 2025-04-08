'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth-store';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export default function Navigation() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold">
                BoilerplateHub
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/explore"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Explore
              </Link>
              <Link
                href="/community"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Community
              </Link>
              {user?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="mr-2"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            {isAuthenticated ? (
              <>
                <Button asChild variant="outline">
                  <Link href="/submit">Submit Boilerplate</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
