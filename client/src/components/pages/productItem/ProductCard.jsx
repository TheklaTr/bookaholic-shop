import BtnRender from './BtnRender'
import { Link } from 'react-router-dom'
import React from 'react'

const ProductCard = ({ product, isAdmin, deleteProduct, handleCheck }) => {
  return (
    <div className="mt-6 border border-gray-200 mx-2 dark:border-gray-500">
      {isAdmin && (
        <input
          className="w-4 h-4 my-4 ml-3"
          type="checkbox"
          checked={product.checked}
          onChange={() => handleCheck(product._id)}
        />
      )}
      <div className="text-center relative">
        <Link to={`/products/${product._id}`} className="align-top">
          <img src={product.images.url} alt={product.title} className="w-full" />
        </Link>
      </div>
      <div className="leading-6 p-4 capitalize">
        <h3 className="font-bold title-display">
          <Link className="" to={`/products/${product._id}`}>
            {product.title}
          </Link>
        </h3>
        <h3 className="text-sm  mt-1 dark:text-gray-300">
          <p>{product.category}</p>
        </h3>
        <p className="text-sm mt-2">&euro;{product.price.toFixed(2)}</p>
        <div className="">
          <BtnRender product={product} deleteProduct={deleteProduct} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
