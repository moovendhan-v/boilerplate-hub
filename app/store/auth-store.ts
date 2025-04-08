import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { graphqlClient } from '@/lib/api-client';
import { LOGIN, REGISTER } from '@/lib/user-queries';

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
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  checkAuth: () => Promise<void>;
  setReturnUrl: (url: string | null) => void;
}

export const useAuthStore = create<AuthState>()(persist(
  (set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    returnUrl: null,

    setReturnUrl: (url: string | null) => set({ returnUrl: url }),

    login: async (email: string, password: string) => {
      try {
        console.log('[Auth] Login attempt:', { email });
        set({ isLoading: true, error: null });
        const { login } = await graphqlClient(LOGIN, { email, password });
        console.log('[Auth] Login response:', login);
        if (!login) {
            throw new Error('Login response is undefined');
        }
        console.log('[Auth] Login response:', { success: !!login?.user });
        // console.log("login?.user", login?.login?.user?.id)
        if (login?.user) {
            console.log('[Auth] Login successful:', { user: login.user });
            set({ user: login.user, isAuthenticated: true, isLoading: false });
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

    checkAuth: async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          console.log('[Auth] No token found');
          set({ user: null, isAuthenticated: false, error: null });
          return;
        }
    
        console.log('[Auth] Checking authentication status');
        const data = await graphqlClient(`
          query CheckAuth {
            me {
              id
              name
              email
              avatar
            }
          }
        `);
    
        if (data?.me) {
          console.log('[Auth] Authentication successful:', { user: data.me });
          set({ user: data.me, isAuthenticated: true, error: null, isLoading: false });
        } else {
          console.log('[Auth] No user data received');
          localStorage.removeItem('auth_token');
          set({ user: null, isAuthenticated: false, error: 'Session expired', isLoading: false });
        }
      } catch (error) {
        const errorMessage = error.message || 'Unexpected authentication error';
        console.error('[Auth] Authentication check failed:', { error: errorMessage });
        set({ user: null, isAuthenticated: false, error: errorMessage });
      }
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
      const { user, isAuthenticated, returnUrl, isLoading, error, login, signup, logout, clearError, checkAuth } = state;
      return {
        user,
        isAuthenticated,
        returnUrl,
        isLoading,
        error,
        // You can return other properties as well, like login, signup, etc., if needed
        login: undefined,  // You can return undefined or omit any function that does not need to persist
        signup: undefined,
        logout: undefined,
        clearError: undefined,
        checkAuth: undefined
      };
    }
  })
);
