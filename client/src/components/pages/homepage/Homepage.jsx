import Banner from '../../main/Banner'
import Children from './img/children.jpg'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import ProductList from '../../main/ProductList'
import React from 'react'
import Science from './img/science.png'

const Homepage = () => {
  const state = React.useContext(GlobalState)
  const [isLogged] = state.useUser.isLogged

  return (
    <div>
      <Banner />
      <ProductList title="Best seller" />
      <div className="container">
        <h2 className="text-3xl font-bold text-center mt-12">Explore our collections</h2>
        <div className="grid grid-cols-2 mt-16">
          <div className="">
            <img src={Science} height="246" width="400" alt="" />
          </div>
          <div className="flex flex-col justify-center">
            <div>
              <h2 className="font-bold text-2xl">Science books</h2>
              <p className="mt-2 text-justify">
                Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction which
                typically deals with imaginative and futuristic concepts such as advanced science and
                technology, space exploration, time travel, parallel universes, and extraterrestrial life.
              </p>
              <button className="button  inline-block mt-6">
                <Link to={isLogged ? '/products' : '/login'}>Shop now</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-16">
          <div className="flex flex-col justify-center">
            <div>
              <h2 className="font-bold text-2xl">Books for children</h2>
              <p className="mt-2 pr-8 text-justify">
                One of the most important skills your child will learn in life is being able to read. And, most
                importantly, reading for pleasure. Reading plays a major role in communication; linking into
                listening, speaking, and writing, and it also stimulates creativity.
              </p>
              <button className="button  inline-block mt-6">
                <Link to={isLogged ? '/products' : '/login'}>Shop now</Link>
              </button>
            </div>
          </div>
          <div className="text-right">
            <img src={Children} height="246" width="400" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage
