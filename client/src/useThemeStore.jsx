import { devtools, persist } from 'zustand/middleware'

import create from 'zustand'

const useThemeStore = create(
  devtools(
    persist(
      (set, get) => ({
        dark: false,
        setDark: (state) => set({ dark: !state }),
      }),
      {
        name: 'darkTheme',
      }
    ),
    { anonymousActionType: 'DarkModeTheme' }
  )
)

export default useThemeStore
