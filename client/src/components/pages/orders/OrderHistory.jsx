import React, { useContext, useEffect } from 'react'

import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'

const OrderHistory = () => {
  const state = useContext(GlobalState)
  const [history, setHistory] = state.useUser.history
  const [isAdmin] = state.useUser.isAdmin
  const [token] = state.token

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        const config = { headers: { Authorization: token } }

        if (isAdmin) {
          const res = await axios.get('/api/payment', config)
          setHistory(res.data)
        } else {
          const res = await axios.get('/user/history', config)
          setHistory(res.data)
        }
      }
      getHistory()
    }
  }, [token, isAdmin, setHistory])

  return (
    <div className="container">
      <h1 className="text-3xl text-center">Orders</h1>
      <h4 className="mt-4">You have {history.length} orders</h4>
      <table className="w-full mt-4">
        <thead>
          <tr className="bg-gray-700  text-white border border-gray-700 dark:bg-gray-300 dark:text-gray-700">
            <th className="p-2 text-center">No.</th>
            <th className="p-2 text-center">Payment ID</th>
            <th className="p-2 text-center">Date of Purchased</th>
            <th className="p-2 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {history.map((items, index) => (
            <tr key={items._id} className="bg-gray-500 text-white odd:bg-white odd:text-gray-700">
              <td className="p-2 text-center border border-gray-500">{index + 1}</td>
              <td className="p-2 text-center border border-gray-500">{items.paymentID}</td>
              <td className="p-2 text-center border border-gray-500">
                {new Date(items.createdAt).toLocaleDateString()}
              </td>
              <td className="p-2 text-center border border-gray-500">
                <Link to={`/orders/${items._id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderHistory
