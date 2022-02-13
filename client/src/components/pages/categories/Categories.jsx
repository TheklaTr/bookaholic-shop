import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import {
  MdOutlineCreateNewFolder,
  MdOutlineSystemUpdateAlt,
} from 'react-icons/md'
import React, { useContext, useState } from 'react'

import { GlobalState } from '../../../GlobalState'
import axios from 'axios'

const Categories = () => {
  const state = useContext(GlobalState)
  const [categories] = state.useCategories.categories
  const [category, setCategory] = useState('')
  const [token] = state.token
  const [callback, setCallback] = state.useCategories.callback
  const [onEdit, setOnEdit] = useState(false)
  const [id, setID] = useState('')

  const createCategory = async (e) => {
    e.preventDefault()
    try {
      const config = { headers: { Authorization: token } }

      if (onEdit) {
        if (window.confirm('Do you want to edit this category?')) {
          const res = await axios.put(
            `/api/category/${id}`,
            { name: category },
            config
          )
          alert(res.data.msg)
        }
      } else {
        if (window.confirm('Do you want to create this category?')) {
          const res = await axios.post(
            '/api/category',
            { name: category },
            config
          )
          alert(res.data.msg)
        }
      }

      setOnEdit(false)
      setCategory('')
      setCallback(!callback)
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  const editCategory = async (id, name) => {
    setID(id)
    setCategory(name)
    setOnEdit(true)
  }

  const deleteCategory = async (id) => {
    try {
      const config = { headers: { Authorization: token } }
      if (window.confirm('Do you want to delete this category?')) {
        const res = await axios.delete(`/api/category/${id}`, config)
        alert(res.data.msg)
        setCallback(!callback)
      }
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  return (
    <div className="container w-1/3">
      <h1 className="text-2xl font-bold">Edit Category</h1>
      <form onSubmit={createCategory}>
        <div className="flex flex-row mt-8">
          <label htmlFor="category" className="self-center">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-500 outline-none p-2 ml-4 w-full"
          />
          <button type="submit" className="text-2xl ml-4 self-center">
            {onEdit ? (
              <MdOutlineSystemUpdateAlt />
            ) : (
              <MdOutlineCreateNewFolder />
            )}
          </button>
        </div>
      </form>

      <div className="col mt-8">
        {categories.map((category) => (
          <div
            className="row flex flex-row gap-4 border-t border-gray-400 py-4 justify-between"
            key={category._id}
          >
            <p className="capitalize">{category.name}</p>
            <div className="text-2xl flex flex-row gap-4">
              <button onClick={() => editCategory(category._id, category.name)}>
                <AiOutlineEdit />
              </button>
              <button onClick={() => deleteCategory(category._id)}>
                <AiOutlineDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
