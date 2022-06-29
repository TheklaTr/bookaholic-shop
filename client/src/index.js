import './styles/global.scss'

import App from './App'
import { DataProvider } from './GlobalContext'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <DataProvider>
    <App />
  </DataProvider>,
  document.getElementById('root')
)
