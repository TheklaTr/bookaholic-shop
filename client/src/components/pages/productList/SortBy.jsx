import React, { useContext } from 'react'

import { GlobalState } from '../../../GlobalState'

const SortBy = () => {
  const state = useContext(GlobalState)
  const [categories] = state.useCategories.categories

  const [category, setCategory] = state.useProducts.category
  const [sort, setSort] = state.useProducts.sort

  const handleCategory = (e) => {
    setCategory(e.target.value)
  }

  return (
    <div className="text-sm">
      <div>
        <span>Filter: </span>
        <select
          className="mt-4 outline-none dark:text-gray-700"
          name="category"
          value={category}
          onChange={handleCategory}
        >
          <option value="">All Products</option>
          {categories.map((category) => (
            <option className="capitalize" value={'category=' + category.name} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="sort mt-4">
        <span>Sort: </span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="dark:text-gray-700 outline-none"
        >
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best sales</option>
          <option value="sort=price">Price: Low-High</option>
          <option value="sort=-price">Price: High-Low</option>
        </select>
      </div>
    </div>
  )
}

export default SortBy
