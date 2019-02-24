import Joi from 'joi'
// import mongoose from 'mongoose'
// import { UserInputError } from 'apollo-server-express'
import { address } from '../schemas'
import { Address } from '../models'

export default {
  UserMoreInfo: {
    address: async ({address}, args, context, info) => {
      return Address.findById(address)
    }
  },
  UserInfo: {
    address: async ({ addressId }, args, context, info) => {
      return Address.findById(addressId)
    }
  },
  Query: {
    address: (root, { id }, context, info) => {
      // TODO: auth, projection, pagination

      return Address.findById(id)
    },
    addresses: (root, args, context, info) => {
    // TODO: auth, projection, pagination
      return Address.find({})
    }

  },
  Mutation: {
    newAddress: async (root, args, context, info) => {
      // TODO: not auth, validation
      await Joi.validate(args, address, { abortEarly: false })
      return Address.create(args)
    }
  }
}
