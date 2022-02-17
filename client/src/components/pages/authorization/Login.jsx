import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' })

  const onChangeInput = (event) => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  const loginSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('/user/login', { ...user })

      localStorage.setItem('firstLogin', true)

      window.location.href = '/'
    } catch (error) {
      alert(error.response.data.msg)
    }
  }
  return (
    <div className="container">
      <form onSubmit={loginSubmit}>
        <h2 className="text-center text-3xl font-bold">Login</h2>
        <div className="w-2/5 mx-auto mt-10 shadow-sm shadow-gray-500 border border-gray-300 px-6 py-8">
          <p className="flex flex-row justify-between mt-6">
            <label htmlFor="email" className="self-center">
              Email:
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="Email"
              value={user.email}
              onChange={onChangeInput}
              className="border border-gray-500 outline-none p-2 ml-4"
            />
          </p>
          <p className="flex flex-row justify-between mt-6">
            <label className="self-center" htmlFor="password">
              Password:
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              autoComplete="on"
              placeholder="Password"
              value={user.password}
              onChange={onChangeInput}
              className="border border-gray-500 outline-none p-2 ml-4"
            />
          </p>
          <div className="flex flex-row justify-between mt-6">
            <button type="submit" className="button">
              Login
            </button>
            <p className="link self-center">
              Not a user?{' '}
              <Link to="/register">
                <button type="submit" className="button-1">
                  Register
                </button>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
