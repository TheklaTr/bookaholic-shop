import BannerImg from './img/banner.jpg'
import { GlobalState } from '../../GlobalState'
import { Link } from 'react-router-dom'
import React from 'react'

const Banner = () => {
  const state = React.useContext(GlobalState)
  const [isLogged] = state.useUser.isLogged
  return (
    <div className="container">
      <div className="relative">
        <div className="absolute top-0 left-0 z-10 w-full h-full flex flex-col justify-center mt-4 ml-10">
          <div className="text-gray-700">
            <h2 className="text-2xl  lg:text-3xl font-bold">
              <span className="font-bold text-red-500 text-4xl">Free</span> Home delivery
            </h2>
            <h2 className="text-2xl lg:text-3xl font-bold mt-1 lg:mt-2">Within 48 hours</h2>
            <button className="button mt-8">
              <Link to={isLogged ? '/products' : '/login'}>Order now</Link>
            </button>
          </div>
        </div>
        <img width={1200} height={450} src={BannerImg} alt="banner" />
      </div>
    </div>
  )
}

export default Banner
