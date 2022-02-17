import { BrowserRouter } from 'react-router-dom'
import { DataProvider } from './GlobalState'
import Layout from './components/Layout'
import Pages from './components/pages/Pages'
import React from 'react'
import useThemeStore from './useThemeStore'

const App = () => {
  const dark = useThemeStore((state) => state.dark)
  return (
    <DataProvider>
      <BrowserRouter>
        <div className={`${dark ? 'dark' : 'light'} theme`}>
          <Layout>
            <Pages />
          </Layout>
        </div>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
