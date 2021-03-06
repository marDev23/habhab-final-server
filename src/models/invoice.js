import mongoose from 'mongoose'

const invoiceSchema = new mongoose.Schema({
  orderId: String,
  invoiceNumber: String
}, {
  timestamps: true
})

invoiceSchema.pre('save', function (next) {
  // const err = new Error('something went wrong')
  // an error.
  next()
})
invoiceSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

const Invoice = mongoose.model('Invoice', invoiceSchema)

export default Invoice
