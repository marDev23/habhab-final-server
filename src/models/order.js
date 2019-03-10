import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  customerId: String,
  orderStatusId: String,
  orderTypeId: String,
  datePlaced: String,
  datePickUp: String,
  isOpened: {
    type: Boolean,
    default: false
  },
  deliveryMan: String 
}, {
  timestamps: true
})

orderSchema.pre('save', function (next) {
  // const err = new Error('something went wrong')
  // an error.
  next()
})
orderSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

const Order = mongoose.model('Order', orderSchema)

export default Order
