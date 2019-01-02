import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
  productId: String,
  userId: String,
  quantity: Number
}, {
  timestamps: true
})

cartSchema.pre('save', function (next) {
  // const err = new Error('something went wrong')
  // an error.
  next()
})
cartSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

const Cart = mongoose.model('Cart', cartSchema)

export default Cart
