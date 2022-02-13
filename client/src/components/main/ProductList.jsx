import React, { useContext } from 'react'

import { GlobalState } from '../../GlobalState'
import ProductItem from './ProductItem'

const ProductList = ({ title }) => {
  const state = useContext(GlobalState)
  const [bestSellers] = state.useProducts.bestSellers

  return (
    <div className="container">
      <h2 className="text-2xl md:text-3xl text-center mt-8 lg:mt-14 pb-6 md:pb-10 tracking-tight font-bold">
        {title}
      </h2>
      <div className="grid grid-cols-4 ">
        {bestSellers.slice(0, 4).map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductList
