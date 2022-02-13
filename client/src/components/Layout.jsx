import Footer from './footer/Footer'
import Header from './header/Header'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="main">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
