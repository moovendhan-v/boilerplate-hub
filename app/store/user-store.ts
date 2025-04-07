import { create } from 'zustand'
import { graphqlClient } from '@/lib/api-client'
import { LOGIN, REGISTER, UPDATE_PROFILE } from '@/lib/user-queries'

interface User {
  id: string
  name: string
  avatar: string
  email: string
}

interface UserStore {
  user: User | null
  loading: boolean
  error: string | null
  setUser: (user: User | null) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  error: null,
  setUser: (user) => set({ user }),
  login: async (email, password) => {
    set({ loading: true, error: null })
    try {
      const data = await graphqlClient(LOGIN, { email, password })
      set({ user: data.login, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },
  logout: () => {
    set({ user: null })
  },
  register: async (userData) => {
    set({ loading: true, error: null })
    try {
      const data = await graphqlClient(REGISTER, { data: userData })
      set({ user: data.register, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },
  updateProfile: async (userData) => {
    set({ loading: true, error: null })
    try {
      const data = await graphqlClient(UPDATE_PROFILE, { data: userData })
      set({ user: data.updateProfile, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  }
}))