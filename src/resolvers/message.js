import Joi from 'joi'
import { Message } from '../models'
import { myMessage } from '../schemas'
import * as Auth from '../auth'

export default {
  Query: {
    message: async (root, { id }, context, info) => {
      return Message.findById(id)
    }
  },
  Mutation: {
    deleteMessage: async (root, { id }, { req }, info) => {
      // TODO: not auth, validation
      Auth.checkSignedIn(req)
      return Message.findOneAndDelete(id)
    },
    addMessage: async (root, args, { req }, info) => {
      // TODO: not auth, validation
      Auth.checkSignedIn(req)
      await Joi.validate(args, myMessage, { abortEarly: false })
      return Message.create(args)
    }
  }
}
