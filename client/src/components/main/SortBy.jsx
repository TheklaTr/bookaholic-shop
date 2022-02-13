import { GlobalState } from '../../GlobalState'
import React from 'react'

const SortBy = () => {
  const state = React.useContext(GlobalState)
  const [sort, setSort] = state.useProducts.sort

  const handleOrderProducts = (event) => {
    setSort(event.target.value)
  }

  return (
    <select
      className="outline-none mt-4 lg:mt-0 text-sm"
      onChange={handleOrderProducts}
      value={sort}
      defaultValue=""
    >
      <option value="">Newest</option>
      <option value="sort=oldest">Oldest</option>
      <option value="sort=-sold">Best selling</option>
      <option value="sort=price">Price: Low to High</option>
      <option value="sort=-price">Price: High to Low</option>
    </select>
  )
}

export default SortBy
