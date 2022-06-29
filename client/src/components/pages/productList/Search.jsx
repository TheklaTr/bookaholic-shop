import React, { useContext } from 'react'

// import { BsSearch } from 'react-icons/bs'
import { GlobalContext } from '../../../GlobalContext'
import InputWithDebouncing from 'react-input-with-debouncing'

const Search = () => {
  const state = useContext(GlobalContext)
  const [search, setSearch] = state.useProducts.search

  return (
    <div className="flex flex-row w-1/2 px-10 ">
      <InputWithDebouncing
        type="text"
        placeholder="Enter search"
        value={search}
        minLength={1}
        debounceTimeout={1000}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        className="border border-gray-400 h-12 w-full px-4 text-gray-700 outline-none outline hover:outline-offset-2 hover:border-red-500 dark:bg-gray-100"
      />
    </div>
  )
}

export default Search
