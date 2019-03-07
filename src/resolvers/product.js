import Joi from 'joi'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { createProduct } from '../schemas'
import { Product, ProductType } from '../models'
import * as Auth from '../auth'


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
    createProduct: async (root, args, { req }, info) => {
      // TODO: not auth, validation
      // console.log(args)
      // Auth.checkSignedIn(req)
      // await Joi.validate(args, createProduct, { abortEarly: false })

      return Product.create(args)
    },
    singleUpload: async (root, { file }, context, info) => {
      console.log(file)
      const storeUpload = ({ stream, filename }) => 
        new Promise((resolve, reject) => 
          stream
            .pipe(createWriteStream(filename))
            .on("finish", () => resolve())
            .on("error", reject)
        )
      
      const { stream, filename, mimetype, encoding } = await file
      await storeUpload({ stream, filename })
      return true

      // 1. Validate file metadata.

      // 2. Stream file contents into cloud storage:
      // https://nodejs.org/api/stream.html

      // 3. Record the file upload in your DB.
      // const id = await recordFile( … )

    }
  }
}
