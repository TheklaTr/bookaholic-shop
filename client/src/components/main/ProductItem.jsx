import { GlobalState } from '../../GlobalState'
import { Link } from 'react-router-dom'
import React from 'react'

const ProductItem = ({ product }) => {
  const state = React.useContext(GlobalState)
  const addCart = state.useUser.addCart

  return (
    <div className="product-item mt-8 lg:px-3 ">
      <div className="text-center relative clear-both">
        <a href="/" className="align-top">
          <img src={product.images.url} height={500} width={333} alt="" />
        </a>
      </div>

      <div className="leading-6 border border-gray-200 p-4">
        <h3 className="font-bold capitalize title-display">
          <Link to={`/products/${product._id}`}>{product.title}</Link>
        </h3>
        <h3 className="text-sm text-gray-500 mt-1 capitalize">
          <a href="/">{product.category}</a>
        </h3>
        <div className="flex flex-row justify-between mt-4">
          <p className="text-sm self-center">&euro;{product.price}</p>{' '}
          <button className="button" onClick={() => addCart(product)}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
