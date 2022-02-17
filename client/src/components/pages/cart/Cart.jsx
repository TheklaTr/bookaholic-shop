import { AiOutlineDelete, AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import React, { useContext, useEffect, useState } from 'react'

import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import PaypalButton from './PaypalButton'
import axios from 'axios'

const Cart = () => {
  const state = useContext(GlobalState)
  const [cart, setCart] = state.useUser.cart
  const [token] = state.token
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => prev + item.price * item.quantity, 0)

      setTotal(total)
    }

    getTotal()
  }, [cart])

  const addToCart = async (cart) => {
    const config = { headers: { Authorization: token } }
    await axios.patch('/user/add_cart', { cart }, config)
  }

  const increment = (id) => {
    cart.map((item) => item._id === id && item.quantity++)

    setCart([...cart])
    addToCart(cart)
  }

  const decrement = (id) => {
    cart.map((item) => item._id === id && (item.quantity === 1 ? item.quantity : item.quantity--))

    setCart([...cart])
    addToCart(cart)
  }

  const removeProduct = (id) => {
    if (window.confirm('Do you want to delete this product?')) {
      // cart.forEach((item, index) => {
      //   if (item._id === id) {
      //     cart.splice(index, 1)
      //   }
      // })
      const removedCart = cart.filter((item) => item._id !== id)
      // console.log(removedCart)

      setCart([...removedCart])
      addToCart(removedCart)
    }
  }

  const tranSuccess = async (payment) => {
    console.log(payment)
    const { paymentID, address } = payment
    const config = { headers: { Authorization: token } }
    await axios.post('/api/payment', { cart, paymentID, address }, config)

    setCart([])
    addToCart([])
    alert('You have successfully placed an order.')
  }

  if (cart.length === 0) return <h2 className="mt-6 text-center text-8xl">Cart Empty</h2>

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Cart</h1>
      <div className="container flex flex-row gap-8 mt-6 w-1/2 capitalize">
        <div className="w-full">
          {cart.map((product) => (
            <div
              className="detail cart flex flex-row text-sm justify-between gap-4 mb-8 border border-gray-400 p-4"
              key={product._id}
            >
              <img src={product.images.url} alt={product.title} width={100} />
              <div className="">
                <h2 className="text-xl font-bold">
                  <Link to={`/products/${product._id}`}>{product.title}</Link>
                </h2>
                <p>{product.category}</p>
              </div>
              <div className="w-full flex flex-row justify-end gap-4">
                <p className="mt-1 text-xl">€ {(product.price * product.quantity).toFixed(2)}</p>
                <div className="amount text-xl">
                  <button onClick={() => decrement(product._id)}>
                    <AiOutlineMinusCircle />
                  </button>
                  <span className="inline-block px-2 align-top -mt-0.5 text-xl">{product.quantity}</span>
                  <button onClick={() => increment(product._id)}>
                    <AiOutlinePlusCircle className="align-top" />
                  </button>
                </div>
                <div className="delete cursor-pointer" onClick={() => removeProduct(product._id)}>
                  <AiOutlineDelete className="text-xl" />
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-row justify-between">
            <p className="text-right text-2xl self-center">
              <b>Total:</b> €{total.toFixed(2)}
            </p>
            <PaypalButton total={total} tranSuccess={tranSuccess} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
