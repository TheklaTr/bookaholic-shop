import React, { createContext, useEffect, useState } from 'react'

import axios from 'axios'
import useCategories from './hooks/useCategories'
import useProducts from './hooks/useProducts'
import useUser from './hooks/useUser'

export const GlobalState = createContext()

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false)

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get('/user/refresh_token')
        setToken(res.data.accessToken)
        setTimeout(() => refreshToken(), 10 * 60 * 1000)
      }
      refreshToken()
    }
  }, [])

  const state = {
    token: [token, setToken],
    useProducts: useProducts(),
    useUser: useUser(token),
    useCategories: useCategories(),
  }

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>
}
