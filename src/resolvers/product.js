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
    products: (root, args, context, info) => {
      // TODO: auth, projection, pagination
      return Product.find({})
    },
    product: (root, { id }, context, info) => {
      // TODO: auth, projection, sanitization

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`)
      }

      return Product.findById(id)
    }

  },
  Mutation: {
    createProduct: async (root, args, { req }, info) => {
      // TODO: not auth, validation
    //   console.log(args)
      Auth.checkSignedIn(req)
      await Joi.validate(args, createProduct, { abortEarly: false })

      return Product.create(args)
    }
  }
}
