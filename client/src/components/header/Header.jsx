import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { FiLogIn, FiLogOut } from 'react-icons/fi'
import { Link, NavLink } from 'react-router-dom'

import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BsFillSunFill } from 'react-icons/bs'
import { FaHistory } from 'react-icons/fa'
import { GiBookshelf } from 'react-icons/gi'
import { GlobalContext } from '../../GlobalContext'
import { MdNightlight } from 'react-icons/md'
import React from 'react'
import { RiAdminFill } from 'react-icons/ri'
import axios from 'axios'
import useThemeStore from '../../useThemeStore'

export default function Header() {
  const state = React.useContext(GlobalContext)
  const dark = useThemeStore((state) => state.dark)
  const setDark = useThemeStore((state) => state.setDark)

  const [isLogged] = state.useUser.isLogged
  const [isAdmin] = state.useUser.isAdmin
  const [cart] = state.useUser.cart

  const quantity = cart.reduce((sum, product) => sum + product.quantity, 0)

  const logoutUser = async () => {
    await axios.get('/user/logout')
    localStorage.removeItem('userLogin')
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

        <ul className="flex-row gap-10 items-center lg:flex justify-center navigation">
          <li className="py-2">
            <NavLink to="/" className="flex flex-row">
              <AiOutlineHome className="mr-1 mt-1 text-sm" /> Home
            </NavLink>
          </li>

          {isAdmin && (
            <>
              <li className="py-2">
                <NavLink className=" flex flex-row" to="/create_product">
                  Create Product
                </NavLink>
              </li>
              <li className="py-2">
                <NavLink className=" flex flex-row" to="/category">
                  Categories
                </NavLink>
              </li>
            </>
          )}

          {!isAdmin && (
            <>
              <li className="py-2 flex flex-row">
                <NavLink to="/products">Products</NavLink>
              </li>
              <li className="py-2  flex flex-row">
                <NavLink to="/about">About us</NavLink>
              </li>
              <li className="py-2 flex flex-row">
                <NavLink to="/contact">Contact us</NavLink>
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
                {quantity}
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
