import Joi from 'joi'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
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
      console.log(args)
      // const { stream, filename, mimetype, encoding } = await args
      // console.log(stream, filename, mimetype, encoding)
      // console.log(root, args, context, info)
      // console.log(rest)
      // const logFile = await args
      // console.log(logFile)
      // return storeUpload({ stream, filename })

      // 1. Validate file metadata.

      // 2. Stream file contents into cloud storage:
      // https://nodejs.org/api/stream.html

      // 3. Record the file upload in your DB.
      // const id = await recordFile( … )

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
