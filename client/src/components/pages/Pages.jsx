import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import Cart from './cart/Cart'
import Categories from './categories/Categories'
import CreateProduct from './productItem/CreateProduct'
import DetailProduct from './productItem/DetailProduct'
import { GlobalState } from '../../GlobalState'
import Homepage from './homepage/Homepage'
import Login from './authorization/Login'
import NotFound from './utils/NotFound'
import OrderDetails from './orders/OrderDetails'
import OrderHistory from './orders/OrderHistory'
import ProductList from './productList/ProductList'
import Register from './authorization/Register'

const Pages = () => {
  const state = useContext(GlobalState)
  const [isLogged] = state.useUser.isLogged
  const [isAdmin] = state.useUser.isAdmin

  return (
    <Routes>
      <Route path="/" element={isAdmin ? <ProductList /> : <Homepage />} />

      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<DetailProduct />} />

      <Route path="/login" element={isLogged ? <NotFound /> : <Login />} />
      <Route path="/register" element={isLogged ? <NotFound /> : <Register />} />

      <Route path="/category" element={isAdmin ? <Categories /> : <NotFound />} />
      <Route path="/create_product" element={isAdmin ? <CreateProduct /> : <NotFound />} />
      <Route path="/edit_product/:id" element={isAdmin ? <CreateProduct /> : <NotFound />} />

      <Route path="/orders" element={isLogged ? <OrderHistory /> : <NotFound />} />
      <Route path="/orders/:id" element={isLogged ? <OrderDetails /> : <NotFound />} />

      <Route path="/cart" element={isAdmin ? <NotFound /> : <Cart />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Pages
