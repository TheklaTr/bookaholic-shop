import React from 'react'

const Filter = () => {
  return (
    <div>
      <ul>
        <li>
          <a href="/" className={'text-red-500'}>
            All categories
          </a>
        </li>
        <li>
          <a href="/">Science</a>
        </li>
        <li>
          <a href="/">Children</a>
        </li>
      </ul>
    </div>
  )
}

export default Filter
