const Category = require('../models/category')
const Products = require('../models/product')

const categoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find()
      res.json(categories)
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  createCategory: async (req, res) => {
    try {
      // if user have role = 1 ---> admin
      // only admin can create , delete and update category
      const { name } = req.body
      const category = await Category.findOne({ name })
      if (category) {
        return res
          .status(400)
          .json({ msg: `The category ${category} already exists.` })
      }

      const newCategory = new Category({ name })

      await newCategory.save()
      res.json({ msg: `Create category ${newCategory.name}` })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const products = await Products.findOne({ category: req.params.id })
      if (products)
        return res.status(400).json({
          msg: 'Please delete all products with a relationship.',
        })

      const deletedCategory = await Category.findByIdAndDelete(req.params.id)
      res.json({ msg: `Deleted Category ${deletedCategory.name}?` })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body
      await Category.findOneAndUpdate({ _id: req.params.id }, { name })

      res.json({ msg: `Update category ${name}` })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
}

module.exports = categoryController
