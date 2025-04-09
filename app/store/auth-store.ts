import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { graphqlClient } from '@/lib/api-client';
import { LOGIN, REGISTER } from '@/lib/user-queries';
import { useRouter } from 'next/navigation';

type UserRole = 'user' | 'admin';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  returnUrl: string | null;
  login: (email: string, password: string, router: any) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  setReturnUrl: (url: string | null) => void;
}

export const useAuthStore = create<AuthState>()(persist(
  (set, get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    returnUrl: null,

    setReturnUrl: (url: string | null) => set({ returnUrl: url }),

    login: async (email: string, password: string, router: any) => {
      try {
        console.log('[Auth] Login attempt:', { email });
        set({ isLoading: true, error: null });
        const { login } = await graphqlClient(LOGIN, { email, password });
        console.log('[Auth] Login response:', login);
        if (!login) {
            throw new Error('Login response is undefined');
        }
        console.log('[Auth] Login response:', { success: !!login?.user });
        if (login?.user) {
            console.log('[Auth] Login successful:', { user: login.user });
            // Token is now handled by HTTP-only cookie set by the server
            // No need to store token in localStorage
            set({ user: login.user, isAuthenticated: true, isLoading: false });
            const { returnUrl } = get();
            console.log('[Auth] Return URL:', returnUrl);
            if (returnUrl) {
                router.push(returnUrl);
                set({ returnUrl: null });
            } else {
                router.push('/explore');
            }
        } else {
            console.error('[Auth] Invalid login response');
            throw new Error('Invalid login response');
        }
      } catch (error) {
        console.error('[Auth] Login error:', error);
        set({ error: error.message, isLoading: false, isAuthenticated: false });
        throw error;
      }
    },

    signup: async (email: string, password: string, name: string) => {
      try {
        console.log('[Auth] Signup attempt:', { email, name });
        set({ isLoading: true, error: null });
        const data = await graphqlClient(REGISTER, { 
          data: { email, password, name }
        });
        console.log('[Auth] Signup successful:', { user: data.register });
        set({ user: data.register, isAuthenticated: true, isLoading: false });
      } catch (error) {
        console.error('[Auth] Signup error:', error);
        set({ error: error.message, isLoading: false, isAuthenticated: false });
        throw error;
      }
    },

    logout: async () => {
      try {
        console.log('[Auth] Logout attempt');
        const response = await fetch('/api/auth/logout', {
          method: 'POST',
          credentials: 'include',
        });

        if (!response.ok) {
          console.error('[Auth] Logout failed:', response.statusText);
          throw new Error('Logout failed');
        }

        console.log('[Auth] Logout successful');
        set({ user: null, isAuthenticated: false });
      } catch (error) {
        console.error('[Auth] Logout error:', error);
        set({ user: null, isAuthenticated: false });
      }
    },

    clearError: () => {
      set({ error: null });
    },


  }),
  {
    name: 'auth-storage',
    storage: {
      getItem: (name) => {
        try {
          if (typeof window === 'undefined') return null;
          const str = localStorage.getItem(name);
          if (!str) return null;
          return JSON.parse(str);
        } catch (error) {
          console.warn('Failed to get item from storage:', error);
          return null;
        }
      },
      setItem: (name, value) => {
        try {
          if (typeof window === 'undefined') return;
          localStorage.setItem(name, JSON.stringify(value));
        } catch (error) {
          console.warn('Failed to set item in storage:', error);
        }
      },
      removeItem: (name) => {
        try {
          if (typeof window === 'undefined') return;
          localStorage.removeItem(name);
        } catch (error) {
          console.warn('Failed to remove item from storage:', error);
        }
      }
    },
    skipHydration: false,
    partialize: (state) => {
      const { user, isAuthenticated, returnUrl, isLoading, error } = state;
      return {
        user,
        isAuthenticated,
        returnUrl,
        isLoading,
        error,
        // Functions don't need to be persisted
        login: undefined,
        signup: undefined,
        logout: undefined,
        clearError: undefined
      };
    }
  })
);
