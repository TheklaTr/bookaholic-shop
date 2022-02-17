import Footer from './footer/Footer'
import Header from './header/Header'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen main">
      <div className="flex-none">
        <Header />
      </div>
      <div className="flex-grow">{children}</div>

      <div className="flex-none">
        <Footer />
      </div>
    </div>
  )
}

export default Layout
