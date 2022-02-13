import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import React from 'react'

function Loading() {
  return (
    <div className="flex h-full flex-row justify-between text-9xl">
      <AiOutlineLoading3Quarters className="animate-spin m-auto my-10" />
    </div>
  )
}

export default Loading
