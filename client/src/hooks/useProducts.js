import { useEffect, useState } from 'react'

import axios from 'axios'

const useProducts = () => {
  const [products, setProducts] = useState([])
  const [callback, setCallback] = useState(false)
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [result, setResult] = useState(0)
  const [bestSellers, setBestSellers] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(`/api/products?limit=${page * 8}&${category}&${sort}&title[regex]=${search}`)
      const bestSeller = await axios.get('/api/products?sort=-sold')

      setProducts(res.data.products)
      setResult(res.data.result)
      setBestSellers(bestSeller.data.products)
    }

    getProducts()
  }, [callback, category, sort, search, page])

  return {
    products: [products, setProducts],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
    bestSellers: [bestSellers, setBestSellers],
  }
}

export default useProducts
