import Joi from 'joi'
import { Message } from '../models'
import { myMessage } from '../schemas'
import * as Auth from '../auth'

export default {
  Mutation: {
    deleteMessage: async (root, { id }, { req }, info) => {
      // TODO: not auth, validation
      Auth.checkSignedIn(req)
      return Message.deleteOne({ id })
    },
    addMessage: async (root, args, { req }, info) => {
      // TODO: not auth, validation
      Auth.checkSignedIn(req)
      await Joi.validate(args, myMessage, { abortEarly: false })
      return Message.create(args)
    }
  }
}
