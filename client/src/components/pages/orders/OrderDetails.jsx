import React, { useContext, useEffect, useState } from 'react'

import { GlobalState } from '../../../GlobalState'
import { useParams } from 'react-router-dom'

const OrderDetails = () => {
  const state = useContext(GlobalState)
  const [history] = state.useUser.history
  const [orderDetails, setOrderDetails] = useState([])

  const params = useParams()

  useEffect(() => {
    if (params.id) {
      history.map((item) => item._id === params.id && setOrderDetails(item))
    }
  }, [params.id, history])

  if (orderDetails.length === 0) return null

  return (
    <div className="container">
      <h2 className="text-2xl font-bold">User Information</h2>
      <table className="w-full mt-4 ">
        <thead>
          <tr className="bg-gray-700 text-white border border-gray-700">
            <th className="p-2 text-center">Name</th>
            <th className="p-2 text-center">Address</th>
            <th className="p-2 text-center">Postal Code</th>
            <th className="p-2 text-center">Country Code</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-500 text-white odd:bg-white odd:text-gray-700">
            <td className="p-2 text-center border border-gray-500">
              {orderDetails.address.recipient_name}
            </td>
            <td className="p-2 text-center border border-gray-500">
              {' '}
              {orderDetails.address.line1 + ' - ' + orderDetails.address.city}
            </td>
            <td className="p-2 text-center border border-gray-500">
              {orderDetails.address.postal_code}
            </td>
            <td className="p-2 text-center border border-gray-500">
              {orderDetails.address.country_code}
            </td>
          </tr>
        </tbody>
      </table>
      <h2 className="text-2xl font-bold mt-8">Items Purchased</h2>
      <table className="w-full mt-4">
        <thead>
          <tr className="bg-gray-700 text-white border border-gray-700">
            <th className="p-2 text-center"></th>
            <th className="p-2 text-center">Products</th>
            <th className="p-2 text-center">Quantity</th>
            <th className="p-2 text-center">Price (€)</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.cart.map((item) => (
            <tr
              className="bg-gray-500 text-white odd:bg-white odd:text-gray-700"
              key={item._id}
            >
              <td className="p-2 text-center border border-gray-500">
                <img src={item.images.url} width={100} alt={item.title} />
              </td>
              <td className="p-2 text-center border border-gray-500 capitalize">
                {item.title}
              </td>
              <td className="p-2 text-center border border-gray-500">
                {item.quantity}
              </td>
              <td className="p-2 text-center border border-gray-500">
                {(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderDetails
