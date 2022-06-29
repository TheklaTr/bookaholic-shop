import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md'
import React, { useContext } from 'react'

import { GlobalContext } from '../../../GlobalContext'

function LoadMore() {
  const state = useContext(GlobalContext)
  const [page, setPage] = state.useProducts.page
  const [result] = state.useProducts.result

  return (
    <div className=" text-5xl text-emerald-900 text-center mt-8">
      {result < page * 8 && result !== 0 ? (
        <button onClick={() => setPage(page - 1)}>
          <MdOutlineExpandLess className="dark:fill-emerald-300" />
        </button>
      ) : (
        <button onClick={() => setPage(page + 1)}>
          <MdOutlineExpandMore className="dark:fill-emerald-300" />
        </button>
      )}
    </div>
  )
}

export default LoadMore
