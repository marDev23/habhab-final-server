import Joi from 'joi'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { createProductType } from '../schemas'
import { ProductType } from '../models'
import * as Auth from '../auth'

export default {
  Query: {
    productTypes: (root, args, context, info) => {
      // TODO: auth, projection, pagination

      return ProductType.find({})
    },
    productType: (root, { id }, context, info) => {
      // TODO: auth, projection, sanitization

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`)
      }

      return ProductType.findById(id)
    }

  },
  Mutation: {
    createProductType: async (root, args, { req }, info) => {
      // TODO: not auth, validation
    //   console.log(args)
      Auth.checkSignedIn(req)
      await Joi.validate(args, createProductType, { abortEarly: false })

      return ProductType.create(args)
    }
  }
}
