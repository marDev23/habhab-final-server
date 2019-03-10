import Joi from 'joi'
// import mongoose from 'mongoose'
// import { UserInputError } from 'apollo-server-express'
import { Delivery } from '../models'

export default {
  Query: {
    deliveryGuys: async (root, args, context, info) => {
      return Delivery.find({})
    },
    deliveryGuy: async (root, args, context, info) => {
      return Delivery.findById(args.id)
    }

  },
  Mutation: {
   createDeliveryMan: async (root, args, context, info) => {
    return Delivery.create(args)
   },
   editDeliveryMan: async (root, args, context, info) => {
    const deliveryUp = await Delivery.findOneAndUpdate({ _id: args.id }, {
      name: args.name,
      email: args.email,
      mobile: args.mobile,
      isAvailable: args.isAvailable
    })
    return {
      id: `${deliveryUp._id}`,
      name: deliveryUp.name,
      email: deliveryUp.email,
      mobile: deliveryUp.mobile,
      isAvailable: deliveryUp.isAvailable
    }
   },
  }
}
