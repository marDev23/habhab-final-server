import Joi from 'joi'
import { hash, compare } from 'bcryptjs'
import { Admin } from '../models'
import { signUpAdmin, signInAdmin } from '../schemas'
import * as Auth from '../auth'

export default {
  Query: {
   adminMe: async (root, args, { req }, info) => {
    return Admin.findById(req.session.userId)
   },
   isAdminSign: async (root, args, { req }, info) => {
    if (req.session.userId) {
      return true
    }
    return false
   }
  },
  Mutation: {
    signUpAdmin: async (root, args, { req }, info) => {
       Auth.checkSignedOut(req)
      await Joi.validate(args, signUpAdmin, { abortEarly: false })
      return Admin.create(args)
    },
    signInAdmin: async (root, args, { req }, info) => {
      // console.log(args)
      Auth.checkSignedOut(req)
      await Joi.validate(args, signInAdmin, { abortEarly: false })
      const hashAdminPass = await hash(args.password, 10)
      const foundUserDB = await Admin.findOne({ email: args.email }, { password: hashAdminPass })
      // console.log(foundUserDB, `${foundUserDB._id}`)
      if (foundUserDB) {
        req.session.userId = `${foundUserDB._id}`
        return true
      }
      return false
    }
  }
}
