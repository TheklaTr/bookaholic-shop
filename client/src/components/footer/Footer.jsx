import React from 'react'

export default function Footer() {
  return (
    <footer className="py-6 bg-black text-gray-300 text-center md:text-left mt-12 lg:mt-24">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <h3 className="font-bold text-2xl text-white">Genres</h3>
            <ul>
              <li className="mt-2">
                <a href="/" className="hover:text-white">
                  History
                </a>
              </li>
              <li className="mt-2">
                <a href="/" className="hover:text-white">
                  Children's Book
                </a>
              </li>
              <li className="mt-2">
                <a href="/" className="hover:text-white">
                  Computer Science
                </a>
              </li>
              <li className="mt-2">
                <a href="/" className="hover:text-white">
                  Fictional Novel
                </a>
              </li>
            </ul>
          </div>
          {/* <div>
            <h3 className="font-bold text-2xl text-white">Authors</h3>
          </div> */}
          <div>
            <h3 className="font-bold text-2xl text-white">About</h3>
            <ul>
              <li className="mt-2">
                <a href="/" className="hover:text-white">
                  Company
                </a>
              </li>
              <li className="mt-2">
                <a href="/" className="hover:text-white">
                  Location
                </a>
              </li>
              <li className="mt-2">
                <a href="/" className="hover:text-white">
                  Contact us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-2xl text-white">Services</h3>
            <ul>
              <li className="mt-2">
                <a href="/" className="hover:text-white">
                  Free ship
                </a>
              </li>
              <li className="mt-2">
                <a href="/" className="hover:text-white">
                  90 days return
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
