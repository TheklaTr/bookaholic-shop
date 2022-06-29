import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' })

  const onChangeInput = (event) => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  const registerSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('/user/register', { ...user })

      localStorage.setItem('userLogin', true)

      window.location.href = '/'
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  return (
    <div className="container">
      <form onSubmit={registerSubmit}>
        <h2 className="text-center text-3xl font-bold">Register</h2>
        <div className="w-2/5 mx-auto mt-10 shadow-sm shadow-gray-500 border border-gray-300 px-6 py-8">
          <p className="flex flex-row justify-between mt-6">
            <label htmlFor="name" className="self-center">
              Name:
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              placeholder="Name"
              value={user.name}
              onChange={onChangeInput}
              className="border border-gray-500 outline-none p-2 ml-4 dark:text-gray-700"
            />
          </p>
          <p className="flex flex-row justify-between mt-6">
            <label className="self-center" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              value={user.email}
              onChange={onChangeInput}
              className="border border-gray-500 outline-none p-2 ml-4 dark:text-gray-700"
            />
          </p>
          <p className="flex flex-row justify-between mt-6">
            <label className="self-center" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              name="password"
              required
              autoComplete="on"
              placeholder="Password"
              value={user.password}
              onChange={onChangeInput}
              className="border border-gray-500 outline-none p-2 ml-4 dark:text-gray-700"
            />
          </p>
          <div className="flex flex-row justify-between mt-6">
            <button type="submit" className="button">
              Register
            </button>

            <p className="link self-center">
              Already Registered?{' '}
              <Link to="/login">
                <button type="submit" className="button-1">
                  Login
                </button>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register
