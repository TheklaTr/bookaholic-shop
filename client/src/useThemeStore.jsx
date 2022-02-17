import create from 'zustand'
import { persist } from 'zustand/middleware'

const useThemeStore = create(
  persist(
    (set, get) => ({
      dark: false,
      setDark: (state) => set({ dark: !state }),
    }),
    {
      name: 'darkThem',
    }
  )
)

export default useThemeStore
