import React, { useContext } from 'react'

// import { BsSearch } from 'react-icons/bs'
import { GlobalState } from '../../../GlobalState'
import InputWithDebouncing from 'react-input-with-debouncing'

const Search = () => {
  const state = useContext(GlobalState)
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
        className="border border-gray-400 h-12 w-full px-4 text-gray-700 outline-none outline hover:outline-offset-2  hover:border-red-500"
      />

      {/* <button
        disabled
        className="bg-white text-gray-500 border border-gray-400 text-xl px-6 h-12 "
      >
        <BsSearch />
      </button> */}
    </div>
  )
}

export default Search
