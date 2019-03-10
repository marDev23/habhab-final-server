import mongoose from 'mongoose'

const deliverySchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  isAvailable: Boolean
})

deliverySchema.pre('save', function (next) {
  // const err = new Error('something went wrong')
  // an error.
  next()
})
deliverySchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

const Delivery = mongoose.model('Delivery', deliverySchema)

export default Delivery