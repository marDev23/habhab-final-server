import mongoose from 'mongoose'

const productTypeSchema = new mongoose.Schema({
  category: {
    type: String,
    validate: {
      validator: category => ProductType.doesntExist({ category }),
      message: ({ value }) => `category name ${value} has already been taken.` // TODO: security
    }
  }
}, {
  timestamps: true
})

productTypeSchema.pre('save', function (next) {
  // const err = new Error('something went wrong')
  // an error.
  next()
})
productTypeSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

const ProductType = mongoose.model('Product Type', productTypeSchema)

export default ProductType
