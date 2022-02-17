import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { FiLogIn, FiLogOut } from 'react-icons/fi'

import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BsFillSunFill } from 'react-icons/bs'
import { FaHistory } from 'react-icons/fa'
import { GiBookshelf } from 'react-icons/gi'
import { GlobalState } from '../../GlobalState'
import { Link } from 'react-router-dom'
import { MdNightlight } from 'react-icons/md'
import React from 'react'
import { RiAdminFill } from 'react-icons/ri'
import axios from 'axios'
import useThemeStore from '../../useThemeStore'

// import Logo from './img/logo.png'

export default function Header() {
  const state = React.useContext(GlobalState)
  const dark = useThemeStore((state) => state.dark)
  const setDark = useThemeStore((state) => state.setDark)

  const [isLogged] = state.useUser.isLogged
  const [isAdmin] = state.useUser.isAdmin
  const [cart] = state.useUser.cart

  const logoutUser = async () => {
    await axios.get('/user/logout')
    localStorage.removeItem('firstLogin')
    window.location.href = '/'
  }

  return (
    <header className={'py-6 w-full z-50 mb-2'}>
      <div className="container flex flex-row justify-between">
        <div className="w-32">
          <a href="/" className="">
            {isAdmin ? (
              <div className="text-5xl mt-3">
                <RiAdminFill />
              </div>
            ) : (
              <div className="flex flex-row space-x-1 text-3xl">
                <div>
                  <GiBookshelf />
                </div>
                <p>BOOKAHOLIC</p>
              </div>
            )}
          </a>
        </div>

        <ul className="flex-row gap-10 items-center lg:flex justify-center">
          <li className="py-2">
            <Link to="/" className="hover:text-red-500 flex flex-row">
              <AiOutlineHome className="mr-1 mt-1 text-sm" /> Home
            </Link>
          </li>

          {isAdmin && (
            <>
              <li className="py-2">
                <Link className="hover:text-red-500 flex flex-row" to="/create_product">
                  Create Product
                </Link>
              </li>
              <li className="py-2">
                <Link className="hover:text-red-500 flex flex-row" to="/category">
                  Categories
                </Link>
              </li>
            </>
          )}

          {!isAdmin && (
            <>
              <li className="py-2 hover:text-red-500 flex flex-row">
                <Link to="/products">Books</Link>
              </li>
              <li className="py-2 hover:text-red-500 flex flex-row">
                <Link to="/products">About us</Link>
              </li>
              <li className="py-2 hover:text-red-500 flex flex-row">
                <Link to="/products">Contact us</Link>
              </li>
            </>
          )}
        </ul>

        <div className="flex flex-row gap-4 text-2xl mt-3">
          {isLogged ? (
            <>
              <Link to="/orders">
                <FaHistory />
              </Link>
              <Link to="/" onClick={logoutUser}>
                <FiLogOut />
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <AiOutlineUser />
              </Link>
              <Link to="/register">
                <FiLogIn />
              </Link>
            </>
          )}

          {!isAdmin && isLogged && (
            <Link to="/cart" className="relative">
              <span className="absolute top-0 right-0 -mt-4 -mr-4 z-10 bg-red-500 rounded-full text-sm text-white w-6 h-6 text-center leading-6">
                {cart.length}
              </span>
              <AiOutlineShoppingCart />
            </Link>
          )}
          <button className="h-6" onClick={() => setDark(dark)}>
            {dark ? <MdNightlight /> : <BsFillSunFill />}
          </button>
        </div>
      </div>
    </header>
  )
}
