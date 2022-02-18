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

  axios.interceptors.response.use(
    function (response) {
      // any status code that lie within the range of 2XX cause this function to trigger
      return response
    },
    function (error) {
      // any status codes that falls outside the range of 2xx cause this function to trigger
      let res = error.response
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get('/api/logout')
            .then((data) => {
              console.log('/401 error > logout')
              localStorage.removeItem('firstLogin')
              window.location.href = '/'
            })
            .catch((error) => {
              console.log('AXIOS INTERCEPTORS ERR', error)
              reject(error)
            })
        })
      }
      return Promise.reject(error)
    }
  )

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get('/api/csrf_token')
      // console.log("CSRF", data);
      axios.defaults.headers['X-CSRF-Token'] = data.getCsrfToken
    }
    getCsrfToken()
  }, [])

  const state = {
    token: [token, setToken],
    useProducts: useProducts(),
    useUser: useUser(token),
    useCategories: useCategories(),
  }

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>
}
