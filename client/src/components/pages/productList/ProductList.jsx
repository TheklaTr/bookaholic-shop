import React, { useContext, useState } from 'react'

import Filter from './Filter'
import { GlobalState } from '../../../GlobalState'
import LoadMore from './LoadMore'
import Loading from '../utils/Loading'
import ProductCard from '../productItem/ProductCard'
import Search from './Search'
import axios from 'axios'

const Products = () => {
  const state = useContext(GlobalState)
  const [products, setProducts] = state.useProducts.products
  const [isAdmin] = state.useUser.isAdmin
  const [token] = state.token
  const [callback, setCallback] = state.useProducts.callback
  const [loading, setLoading] = useState(false)
  const [isCheck, setIsCheck] = useState(false)

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked
    })

    setProducts([...products])
  }

  const deleteProduct = async (id, public_id) => {
    try {
      const config = { headers: { Authorization: token } }
      if (window.confirm('Are you sure you want to delete this product?')) {
        setLoading(true)
        const destroyImg = axios.post('/api/destroy', { public_id }, config)
        const deleteProduct = axios.delete(`/api/products/${id}`, config)

        await destroyImg
        await deleteProduct
        setCallback(!callback)
        setLoading(false)
      }
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  const checkAll = () => {
    products.filter((product) => (product.checked = !isCheck))
    setProducts([...products])
    setIsCheck(!isCheck)
  }

  const deleteAll = () => {
    if (window.confirm('Are you sure you want to delete all products?')) {
      products.map(
        (product) =>
          product.checked &&
          deleteProduct(product._id, product.images.public_id)
      )
    }
  }

  if (loading) return <Loading />
  console.log(products.length)

  return (
    <div className="container">
      <div className="flex mt-4">
        <h1 className="text-3xl font-bold no-underline mt-4">Books</h1>
        <div className="w-full gap-10 text-lg items-center hidden lg:flex justify-center ">
          Search:
          <Search />
        </div>
      </div>

      <div className="flex mt-4">
        <div className="w-48">
          <Filter />
        </div>

        <div className="w-full pl-10">
          {isAdmin && (
            <div className="delete-all text-lg pl-5">
              <span className="mr-2">Select all</span>
              <input type="checkbox" checked={isCheck} onChange={checkAll} />
              <button className="button ml-2" onClick={deleteAll}>
                Delete all
              </button>
            </div>
          )}

          <div>
            <div className="grid grid-cols-4">
              {products.map((product) => {
                return (
                  <ProductCard
                    key={product._id}
                    product={product}
                    isAdmin={isAdmin}
                    deleteProduct={deleteProduct}
                    handleCheck={handleCheck}
                  />
                )
              })}
            </div>
            {products.length >= 8 && <LoadMore />}
          </div>
        </div>
      </div>

      {/* {products.length === 0 && <Loading />} */}
      {products.length === 0 && (
        <div className="text-center text-7xl">No product!</div>
      )}
    </div>
  )
}

export default Products
