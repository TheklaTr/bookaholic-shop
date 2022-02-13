import { BrowserRouter } from 'react-router-dom'
import { DataProvider } from './GlobalState'
import Layout from './components/Layout'
import Pages from './components/pages/Pages'
import React from 'react'

const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <Layout>
          <Pages />
        </Layout>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
