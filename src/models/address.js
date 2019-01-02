import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
  province: String,
  municipal: String,
  baranggay: {
    type: String,
    validate: {
      validator: baranggay => Address.doesntExist({ baranggay }),
      message: ({ value }) => `baranggay ${value} already exist.` // TODO: security
    }
  },
  zip: Number,
  fee: Number
}, {
  timestamps: true
})

addressSchema.pre('save', function (next) {
  // const err = new Error('something went wrong')
  // an error.
  next()
})
addressSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

const Address = mongoose.model('Address', addressSchema)

export default Address
