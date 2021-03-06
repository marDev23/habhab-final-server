import mongoose from 'mongoose'

const orderTypeSchema = new mongoose.Schema({
  type: String
})

orderTypeSchema.pre('save', function (next) {
  // const err = new Error('something went wrong')
  // an error.
  next()
})
orderTypeSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

const OrderType = mongoose.model('Order Type', orderTypeSchema)

export default OrderType
