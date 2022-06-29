import React, { useContext } from 'react'

import { GlobalContext } from '../../../GlobalContext'
import { Link } from 'react-router-dom'

const BtnRender = ({ product, deleteProduct }) => {
  const state = useContext(GlobalContext)
  const [isAdmin] = state.useUser.isAdmin
  const addCart = state.useUser.addCart

  return (
    <div className="mt-2.5 uppercase">
      {isAdmin ? (
        <div className="text-white text-center font-semibold gap-2 flex flex-row">
          <Link
            className="button w-1/2 inline-block"
            id="btn_buy"
            to="#!"
            onClick={() => deleteProduct(product._id, product.images.public_id)}
          >
            Delete
          </Link>
          <Link className="button-1 w-1/2 inline-block" id="btn_view" to={`/edit_product/${product._id}`}>
            Edit
          </Link>
        </div>
      ) : (
        <div className="tracking-wide text-white text-center font-semibold gap-2 flex flex-row">
          <Link className="button w-1/2 inline-block" to="#!" onClick={() => addCart(product)}>
            Buy
          </Link>
          <Link className="button-1 w-1/2 inline-block" id="btn_view" to={`/products/${product._id}`}>
            View
          </Link>
        </div>
      )}
    </div>
  )
}

export default BtnRender
