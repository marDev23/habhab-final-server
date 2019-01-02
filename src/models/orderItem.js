import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
  productId: String,
  orderId: String,
  itemStatusId: String,
  quantity: Number,
  price: Number
}, {
  timestamps: true
})

orderItemSchema.pre('save', function (next) {
  // const err = new Error('something went wrong')
  // an error.
  next()
})
orderItemSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

const OrderItem = mongoose.model('Order Item', orderItemSchema)

export default OrderItem
