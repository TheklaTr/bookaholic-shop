const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0 },
    cart: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
)

// On line 16, the mongoose API set() helps alter the operations of the mongoose model before
// logging into the console. The user schema is overwritten to JSON,
// and the field ”_id” is duplicated as ”id” and then deleted.
// The ”_v” field is also removed as it is unnecessary, while the ”password” field is taken out to prevent revealing.
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
