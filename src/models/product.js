import mongoose from 'mongoose'
// import { hash } from 'bcryptjs'
// const categoryId = mongoose.Schema.Types.ObjectId

const productSchema = new mongoose.Schema({
  categoryId: {
    // name: 'categoryId',
    // key: '$categoryId',
    type: String
    // ref: 'User',

  },
  img: String,
  code: {
    type: String,
    validate: {
      validator: code => Product.doesntExist({ code }),
      message: ({ value }) => `product code ${value} has already been taken.` // TODO: security
    }
  },
  name: {
    type: String,
    validate: {
      validator: name => Product.doesntExist({ name }),
      message: ({ value }) => `product name ${value} has already been taken.` // TODO: security
    }
  },
  price: Number,
  description: {
    type: String,
    validate: {
      validator: description => Product.doesntExist({ description }),
      message: ({ value }) => `product description ${value} has already been taken.` // TODO: security
    }
  }
}, {
  timestamps: true
})

productSchema.pre('save', function (next) {
  // const err = new Error('something went wrong')
  // an error.
  next()
})
productSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

const Product = mongoose.model('Product', productSchema)

export default Product
