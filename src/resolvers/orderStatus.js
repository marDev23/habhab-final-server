import Joi from 'joi'
// import mongoose from 'mongoose'
// import { UserInputError } from 'apollo-server-express'
// import { placeOrder } from '../schemas'
import { OrderStatus } from '../models'

export default {
  Query: {
    orderStatus: (root, {id}, context, info) => {
      // TODO: auth, projection, pagination

      return OrderStatus.findById(id)
    },
    orderStatuses: () => {
      // TODO: auth, projection, pagination

      return OrderStatus.find({})
    }

  },
  Mutation: {
    addOrderStatus: async (root, args, context, info) => {
      // TODO: not auth, validation
      // await Joi.validate(args, placeOrder, { abortEarly: false })
      return OrderStatus.create(args)
    }
  }
}
