import mongoose from 'mongoose'

const shipmentSchema = new mongoose.Schema({
  orderId: String,
  addressId: String
}, {
  timestamps: true
})

shipmentSchema.pre('save', function (next) {
  // const err = new Error('something went wrong')
  // an error.
  next()
})
shipmentSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

const Shipment = mongoose.model('Shipment', shipmentSchema)

export default Shipment
