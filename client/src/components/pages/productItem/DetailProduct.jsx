import { Link, useParams } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'

import { GlobalState } from '../../../GlobalState'
import ProductCard from './ProductCard'

const DetailProduct = () => {
  const params = useParams()
  const state = useContext(GlobalState)
  const [allBooks] = state.useProducts.allBooks
  const [isAdmin] = state.useUser.isAdmin
  const [detailProduct, setDetailProduct] = useState([])
  const addCart = state.useUser.addCart

  useEffect(() => {
    if (params.id) {
      allBooks.map((product) => product._id === params.id && setDetailProduct(product))
    }
  }, [params.id, allBooks])

  if (detailProduct.length === 0) {
    return null
  }

  return (
    <div className="container ">
      <div className="flex flex-row gap-8">
        <div className="w-1/2">
          <img src={detailProduct.images.url} alt={detailProduct.title} />
        </div>
        <div className="w-1/2">
          <div>
            <h1 className="text-4xl font-bold uppercase">{detailProduct.title}</h1>
          </div>
          <p className="mt-4 capitalize">Category: {detailProduct.category}</p>
          <p className="mt-4 capitalize">Description:</p>
          <p className="mt-4 whitespace-pre-line">{detailProduct.description}</p>
          <div className="flex flex-row justify-between mt-5">
            <p className="text-2xl">Sold: {detailProduct.sold}</p>
            <span className="text-2xl text-right">Price: € {detailProduct.price.toFixed(2)}</span>
          </div>
          <p className="text-2xl flex flex-row justify-between mt-4">
            <button className="button-1">
              <Link to="/products">BACK</Link>
            </button>
            {!isAdmin ? (
              <Link to="/cart" className="button" onClick={() => addCart(detailProduct)}>
                BUY NOW
              </Link>
            ) : (
              <Link to={`/edit_product/${detailProduct._id}`} className="button">
                EDIT
              </Link>
            )}
          </p>
        </div>
      </div>

      <div>
        {allBooks.some(
          (product) => product.category === detailProduct.category && product._id !== detailProduct._id
        ) === true ? (
          <h2 className="text-3xl font-bold mt-8">Related products</h2>
        ) : null}

        <div className="grid grid-cols-4">
          {allBooks.map(
            (product) =>
              product.category === detailProduct.category &&
              product._id !== detailProduct._id && (
                <div key={product._id}>
                  <ProductCard key={product._id} product={product} />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  )
}

export default DetailProduct
