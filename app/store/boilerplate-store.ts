import { create } from 'zustand'
import { graphqlClient } from '@/lib/api-client'
import { GET_BOILERPLATES, GET_BOILERPLATE_DETAILS, CREATE_BOILERPLATE, UPDATE_BOILERPLATE, DELETE_BOILERPLATE } from '@/lib/graphql-queries'

interface Boilerplate {
  id: string
  name: string
  description: string
  tags: string[]
  framework: string
  language: string
  stars: number
  downloads: number
  createdAt: string
  updatedAt: string
  author: {
    id: string
    name: string
    avatar: string
  }
}

interface BoilerplateFile {
  id: string
  name: string
  content: string
  language: string
  path: string
}

interface BoilerplateDetails extends Boilerplate {
  files: BoilerplateFile[]
}

interface BoilerplateStore {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
  boilerplates: Boilerplate[]
  loading: boolean
  error: string | null
  currentBoilerplate: BoilerplateDetails | null
  fetchBoilerplates: () => Promise<void>
  fetchBoilerplateDetails: (id: string) => Promise<void>
  createBoilerplate: (data: Omit<Boilerplate, 'id' | 'stars' | 'downloads' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateBoilerplate: (id: string, data: Partial<Boilerplate>) => Promise<void>
  deleteBoilerplate: (id: string) => Promise<void>
}

export const useBoilerplateStore = create<BoilerplateStore>((set) => ({
  currentBoilerplate: null,
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  boilerplates: [],
  loading: false,
  error: null,
  fetchBoilerplates: async () => {
    set({ loading: true, error: null })
    try {
      const data = await graphqlClient(GET_BOILERPLATES);
      console.log("GET_BOILERPLATES", data);
      set({ boilerplates: data.boilerplates, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },
  createBoilerplate: async (boilerplateData) => {
    set({ loading: true, error: null })
    try {
      const data = await graphqlClient(CREATE_BOILERPLATE, { data: boilerplateData });
      console.log("CREATE_BOILERPLATE", data);
      set(state => ({
        boilerplates: [...state.boilerplates, data.createBoilerplate],
        loading: false
      }))
      return data.createBoilerplate;
    } catch (error) {
      console.log("CREATE_BOILERPLATE", error);
      set({ error: error.message, loading: false })
      throw error;
    }
  },
  updateBoilerplate: async (id, boilerplateData) => {
    set({ loading: true, error: null })
    try {
      const data = await graphqlClient(UPDATE_BOILERPLATE, { id, data: boilerplateData })
      set(state => ({
        boilerplates: state.boilerplates.map(b =>
          b.id === id ? data.updateBoilerplate : b
        ),
        loading: false
      }))
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },
  deleteBoilerplate: async (id) => {
    set({ loading: true, error: null })
    try {
      await graphqlClient(DELETE_BOILERPLATE, { id })
      set(state => ({
        boilerplates: state.boilerplates.filter(b => b.id !== id),
        loading: false
      }))
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },
  fetchBoilerplateDetails: async (id) => {
    set({ loading: true, error: null })
    try {
      const data = await graphqlClient(GET_BOILERPLATE_DETAILS, { id })
      console.log("GET_BOILERPLATE_DETAILS", data);
      set({ currentBoilerplate: data.boilerplate, loading: false })
    } catch (error) {
      console.log("GET_BOILERPLATE_DETAILS", error);
      set({ error: error.message, loading: false })
    }
  }
}))