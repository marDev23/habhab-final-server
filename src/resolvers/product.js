import Joi from 'joi'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { createWriteStream } from 'fs'
// import { processRequest } from 'graphql-upload'
import { createProduct } from '../schemas'
import { Product, ProductType } from '../models'
import * as Auth from '../auth'

const storeUpload = ({ stream, filename }) =>
  new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(filename))
      .on("finish", () => resolve())
      .on("error", reject)
  )

export default {
  Product: {
    category: ({ categoryId }, args, context, info) => {
      return ProductType.findById(categoryId)
    }
  },
  Query: {
    product: (_, { name }, context, info) => {
      return Product.findOne({ name: name })
    },
    products: (root, args, context, info) => {
      // TODO: auth, projection, pagination
      return Product.find({})
    },
    productByCategory: (root, { categoryId }, context, info) => {
      // TODO: auth, projection, sanitization

      // if (!mongoose.Types.ObjectId.isValid(id)) {
      //   throw new UserInputError(`${id} is not a valid user ID.`)
      // }

      return Product.find({ categoryId: categoryId })
    }
  },
  Mutation: {
    singleUpload: async (root, args, context, info) => {
      const { createReadStream, filename, mimetype } = await file
      const stream = createReadStream()
      const promiseFile = await storeUpload({ stream, filename })
    },
    createProduct: async (root, args, { req }, info) => {
      return Product.create(args)
    },
    deleteProduct: async (root, args, context, info) => {
      const deletedProduct = await Product.findByIdAndRemove(args.id)
      if (deleteProduct) {
        return 'Successfully deleted'
      }
      throw new UserInputError('Error deleting products')
    }
    
  }
}
