import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/Loading'
import { TiDelete } from 'react-icons/ti'
import axios from 'axios'

const initialState = {
  product_id: '',
  title: '',
  price: 0,
  description: 'Enter the description',
  content: 'Enter the content',
  category: '',
  _id: '',
}

const CreateProduct = () => {
  const state = useContext(GlobalState)
  const [product, setProduct] = useState(initialState)
  const [categories] = state.useCategories.categories
  const [images, setImages] = useState(false)
  const [loading, setLoading] = useState(false)

  const [isAdmin] = state.useUser.isAdmin
  const [token] = state.token

  const navigate = useNavigate()
  const param = useParams()

  const [products] = state.useProducts.products
  const [onEdit, setOnEdit] = useState(false)
  const [callback, setCallback] = state.useProducts.callback

  useEffect(() => {
    if (param.id) {
      setOnEdit(true)
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product)
          setImages(product.images)
        }
      })
    } else {
      setOnEdit(false)
      setProduct(initialState)
      setImages(false)
    }
  }, [param.id, products])

  const handleUpload = async (event) => {
    event.preventDefault()
    try {
      if (!isAdmin) return alert("You're not an admin")
      const file = event.target.files[0]

      if (!file) return alert('File not exist.')

      if (file.size > 1024 * 1024)
        // 1mb
        return alert('Size too large!')

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        // 1mb
        return alert('File format is incorrect.')

      let formData = new FormData()
      formData.append('file', file)

      setLoading(true)
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: token,
        },
      })
      setLoading(false)
      setImages(res.data)
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("You're not an admin")
      setLoading(true)
      await axios.post(
        '/api/destroy',
        { public_id: images.public_id },
        { headers: { Authorization: token } }
      )
      setLoading(false)
      setImages(false)
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!isAdmin) return alert("You're not an admin")
      if (!images) return alert('No Image Upload')

      if (onEdit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, images },
          { headers: { Authorization: token } }
        )
      } else {
        await axios.post(
          '/api/products',
          { ...product, images },
          { headers: { Authorization: token } }
        )
      }
      setCallback(!callback)
      navigate('/')
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  const styleUpload = {
    display: images ? 'block' : 'none',
  }
  return (
    <div className="container">
      <h1 className="text-2xl font-bold">
        {onEdit ? 'Update Product' : 'Create Product'}
      </h1>
      <div className=" grid grid-cols-3 gap-8 mt-8">
        <div className="upload">
          <label className="self-center w-24">Image</label>
          {!images && (
            <input
              type="file"
              name="file"
              id="file_up"
              onChange={handleUpload}
            />
          )}

          {loading ? (
            <div id="file_img">
              <Loading />
            </div>
          ) : (
            <div id="file_img" className="relative mt-4" style={styleUpload}>
              <img src={images ? images.url : ''} alt="" />
              <span
                onClick={handleDestroy}
                className="absolute top-0 right-0 text-4xl text-red-500"
              >
                <TiDelete />
              </span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="col-span-2">
          <div className="row flex flex-row gap-4 justify-between">
            <label htmlFor="product_id" className="self-center w-24">
              Product ID
            </label>
            <input
              type="text"
              name="product_id"
              id="product_id"
              required
              value={product.product_id}
              onChange={handleChangeInput}
              disabled={onEdit}
              className="border border-gray-500 outline-none p-2 ml-4 w-full"
            />
          </div>
          <div className="row flex flex-row gap-4 justify-between mt-4">
            <label htmlFor="title" className="self-center w-24">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={product.title}
              onChange={handleChangeInput}
              className="border border-gray-500 outline-none p-2 ml-4 w-full"
            />
          </div>

          <div className="row flex flex-row gap-4 justify-between mt-4">
            <label htmlFor="price" className="self-center w-24">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              required
              value={product.price}
              onChange={handleChangeInput}
              className="border border-gray-500 outline-none p-2 ml-4 w-full"
            />
          </div>

          <div className="row flex flex-row gap-4 justify-between mt-4">
            <label htmlFor="description" className="w-24">
              Description
            </label>
            <textarea
              type="text"
              name="description"
              id="description"
              required
              value={product.description}
              rows="5"
              onChange={handleChangeInput}
              className="border border-gray-500 outline-none p-2 ml-3 w-full"
            />
          </div>

          <div className="row flex flex-row gap-4 justify-between mt-4">
            <label htmlFor="content" className="w-24">
              Content
            </label>
            <textarea
              type="text"
              name="content"
              id="content"
              required
              value={product.content}
              rows="7"
              onChange={handleChangeInput}
              className="border border-gray-500 outline-none p-2 ml-4 w-full"
            />
          </div>

          <div className="row flex flex-row gap-4 justify-between mt-4">
            <label htmlFor="categories" className="w-24">
              Categories:{' '}
            </label>
            <select
              name="category"
              value={product.category}
              onChange={handleChangeInput}
              className="outline-none"
            >
              <option value="">Please select a category</option>
              {categories.map((category) => (
                <option
                  className="capitalize"
                  value={category.name}
                  // value={category}
                  key={category._id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <p className="text-right">
            <button type="submit" className="button mt-4">
              {onEdit ? 'UPDATE' : 'CREATE'}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default CreateProduct
