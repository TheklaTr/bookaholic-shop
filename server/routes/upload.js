const router = require('express').Router()
const cloudinary = require('cloudinary')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')
const fs = require('fs')

// we will upload image on cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

// Upload image only admin can use
router.post('/upload', auth, adminAuth, (req, res) => {
  try {
    // console.log(req.files)
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ msg: 'No files were uploaded.' })

    const file = req.files.file
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath)
      return res.status(400).json({ msg: 'Size too large' })
    }

    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      removeTmp(file.tempFilePath)
      return res.status(400).json({ msg: 'File format is incorrect.' })
    }
    console.log(file.name)

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: 'test',
        transformation: { width: 500, height: 650, crop: 'lfill' },
      },
      async (err, result) => {
        if (err) throw err

        removeTmp(file.tempFilePath)
        res.json({ public_id: result.public_id, url: result.secure_url })
      }
    )
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
})

// Delete image only admin can use
router.post('/destroy', auth, adminAuth, (req, res) => {
  try {
    const { public_id } = req.body
    if (!public_id) return res.status(400).json({ msg: 'No images Selected' })

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err
      res.json({ message: 'Deleted Image', result })
    })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
})

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err
  })
}

module.exports = router
