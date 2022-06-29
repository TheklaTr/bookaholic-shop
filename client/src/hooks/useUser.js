import { useEffect, useState } from 'react'

import axios from 'axios'

const useUser = (token) => {
  const [isLogged, setIsLogged] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [cart, setCart] = useState([])
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const config = { headers: { Authorization: token } }
          const res = await axios.get('/user/info', config)

          setIsLogged(true)
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

          setCart(res.data.cart)
        } catch (error) {
          alert(error.response.data.msg)
        }
      }

      getUser()
    }
  }, [token])

  const addCart = async (product) => {
    if (!isLogged) return alert('Please login to continue buying')
    const check = cart.every((item) => item._id !== product._id)

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }])

      await axios.patch(
        '/user/add_cart',
        { cart: [...cart, { ...product, quantity: 1 }] },
        { headers: { Authorization: token } }
      )
    } else {
      alert('This product has been added to cart.')
    }
  }

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    history: [history, setHistory],
  }
}

export default useUser
