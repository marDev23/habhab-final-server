import Joi from 'joi'
// import mongoose from 'mongoose'
// import { UserInputError } from 'apollo-server-express'
import { placeOrder } from '../schemas'
import { Order } from '../models'

export default {
  Query: {
    orders: (root, args, context, info) => {
      // TODO: auth, projection, pagination

      return Order.find({})
    }

  },
  Mutation: {
    placeOrder: async (root, args, context, info) => {
      // TODO: not auth, validation
      await Joi.validate(args, placeOrder, { abortEarly: false })
      return Order.create(args)
    }
  }
}
