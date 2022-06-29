import { BrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Pages from './components/pages/Pages'
import React from 'react'
import useThemeStore from './useThemeStore'

const App = () => {
  const dark = useThemeStore((state) => state.dark)

  return (
    <BrowserRouter>
      <div className={`${dark ? 'dark' : 'light'} theme`}>
        <Layout>
          <Pages />
        </Layout>
      </div>
    </BrowserRouter>
  )
}

export default App
