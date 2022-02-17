const Product = require('../models/product')

// Filter, sorting and paginating using queryString
class APIfeatures {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }
  filtering() {
    const queryObj = { ...this.queryString } //queryString = req.query
    // console.log({ before: queryObj }) // before delete page

    const excludedFields = ['page', 'sort', 'limit']
    excludedFields.forEach((element) => delete queryObj[element])
    // console.log({ after: queryObj }) // after delete page

    let queryStr = JSON.stringify(queryObj)

    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, (match) => '$' + match)
    // console.log({ queryObj, queryStr })
    /**
     * * gte = greater than or equal
     * * lte = lesser than or equal
     * * lt = lesser than
     * * gt = greater than
     */

    this.query.find(JSON.parse(queryStr))
    return this
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ')
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort('-createdAt')
    }
    return this
  }

  paginating() {
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 8
    const skip = (page - 1) * limit
    this.query = this.query.skip(skip).limit(limit)
    return this
  }
}

const productController = {
  getProducts: async (req, res) => {
    try {
      // console.log(req.query)
      const features = new APIfeatures(Product.find(), req.query).filtering().sorting().paginating()
      const products = await features.query

      res.json({
        status: 'success',
        result: products.length,
        products: products,
      })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  createProduct: async (req, res) => {
    try {
      const { product_id, title, price, description, content, images, category } = req.body
      if (!images) return res.status(400).json({ msg: 'No image upload' })

      const product = await Product.findOne({ product_id })
      if (product) return res.status(400).json({ msg: `The product "${product.title}" already exists!` })

      const newProduct = new Product({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      })

      await newProduct.save()
      res.json({ msg: `Created product ${newProduct.title.toUpperCase()}` })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id)
      res.json({ msg: `Deleted Product ${deletedProduct}` })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { title, price, description, content, images, category } = req.body
      if (!images) return res.status(400).json({ msg: 'No image upload' })

      const updatedProduct = await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
        }
      )

      res.json({
        msg: `Updated Product ${updatedProduct.title.toUpperCase()}`,
      })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
}
module.exports = productController
