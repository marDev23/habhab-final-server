import mongoose from 'mongoose'

const orderStatusSchema = new mongoose.Schema({
  status: String
})

orderStatusSchema.pre('save', function (next) {
  // const err = new Error('something went wrong')
  // an error.
  next()
})
orderStatusSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

const OrderStatus = mongoose.model('Order Status', orderStatusSchema)

export default OrderStatus
