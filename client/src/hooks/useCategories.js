import { useEffect, useState } from 'react'

import axios from 'axios'

const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [callback, setCallback] = useState(false)

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get('/api/category')
      setCategories(res.data.sort((a, b) => a.name.localeCompare(b.name)))
    }

    getCategories()
  }, [callback])

  return {
    categories: [categories, setCategories],
    callback: [callback, setCallback],
  }
}

export default useCategories
