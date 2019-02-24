import Joi from 'joi'
// import mongoose from 'mongoose'
// import { UserInputError } from 'apollo-server-express'
// import { placeOrder } from '../schemas'
import { OrderType } from '../models'

export default {
  Query: {
    orderType: (root, {id}, context, info) => {
      // TODO: auth, projection, pagination

      return OrderType.findById(id)
    },
    orderTypes: () => {
      // TODO: auth, projection, pagination

      return OrderType.find({})
    }

  },
  Mutation: {
    addOrderType: async (root, args, context, info) => {
      // TODO: not auth, validation
      // await Joi.validate(args, placeOrder, { abortEarly: false })
      return OrderType.create(args)
    }
  }
}
