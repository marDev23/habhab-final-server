import Joi from 'joi'
// import mongoose from 'mongoose'
// import { UserInputError } from 'apollo-server-express'
// import { placeOrder } from '../schemas'
import { ItemStatus } from '../models'

export default {
  Query: {
    itemStatus: (root, {id}, context, info) => {
      // TODO: auth, projection, pagination

      return ItemStatus.findById(id)
    },
    itemStatuses: () => {
      // TODO: auth, projection, pagination

      return ItemStatus.find({})
    }

  },
  Mutation: {
    addItemStatus: async (root, args, context, info) => {
      // TODO: not auth, validation
      // console.log(args)
      // await Joi.validate(args, placeOrder, { abortEarly: false })
      return ItemStatus.create(args)
    }
  }
}
