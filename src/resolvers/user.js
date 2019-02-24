import Joi from 'joi'
import jwt from 'jsonwebtoken'
import { UserInputError } from 'apollo-server-express'
import { hash, compare } from 'bcryptjs'
// import { UserInputError } from 'apollo-server-express'
import { signUp, signIn } from '../schemas'
import { JWT_EMAIL, MAIL_ADDRESS } from '../config'
import {
  User,
  Message,
  Order,
  Cart,
  Address } from '../models'
import { sender } from '../mail'
import * as Auth from '../auth'

export default {
  User: {
    messages: async ({ id }, args, { req }, info) => {
      Auth.checkSignedIn(req)
      const userMessage = await Message.find({ userId: id })
      return userMessage.map((x) => ({
        id: `${x._id}`,
        userId: x.userId,
        title: x.title,
        body: x.body,
        isOpened: x.isOpened
      }))
    },
    orders: async ({ id }, args, { req }, info) => {
      Auth.checkSignedIn(req)
      const userOrder = await Order.find({ customerId: id })
      return userOrder.map((x) => ({
        id: `${x._id}`,
        customerId: x.customerId,
        orderStatusId: x.orderStatusId,
        orderTypeId: x.orderTypeId,
        datePlaced: x.datePlaced,
        datePickUp: x.datePickUp,
        isOpened: x.isOpened
      }))
    },
    cart: async ({ id }, args, context, info) => {
      const userCart = await Cart.find({ userId: id })
      return userCart.map((x) => ({
        id: `${x.id}`,
        productId: x.productId,
        quantity: x.quantity,
        userId: x.userId
      }))
    },
    address: async ({address}, args, { req }, info) => {
     return Address.findById(address)
    }

  },
  Query: {
    me: async (root, args, { req }, info) => {
      // projection
      Auth.checkSignedIn(req)
      const meData = await User.findById(req.session.userId)
      // console.log(meData)
      return {
        id: `${meData._id}`,
        name: meData.name,
        email: meData.email,
        mobile: meData.mobile,
        address: meData.address
      }
    },
    users: (root, args, { req }, info) => {
      // TODO: auth, projection, pagination

      // Auth.checkSignedIn(req)

      return User.find({})
    },
    isSignIn: (root, args, { req }, info) => {
      const sessionUser = req.session.userId
      if (!sessionUser) {
        return false
      }
      return true

    },
    meMore: async (root, args, { req }, info) => {
      const userMoreInfo = await User.findById(req.session.userId)
      // console.log(userMoreInfo)
      return {
        id: `${userMoreInfo.id}`,
        address: userMoreInfo.address,
        gender: userMoreInfo.gender,
        birthday: userMoreInfo.birthday
      }
    }

  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      // TODO: not auth, validation

      // Auth.checkSignedOut(req)

      await Joi.validate(args, signUp, { abortEarly: false })
      const user = await User.create(args)

      return true
    },
    addMoreInfo: async (root, args, { req }, info) => {
      // console.log(args.birthday)
       const userMoreData = await User.findOneAndUpdate({ _id: req.session.userId }, {
        address: args.address,
        gender: args.gender,
        birthday: `${args.birthday}`
       })
       console.log(userMoreData)
        return {
          id: `${userMoreData._id}`,
          address: userMoreData.address,
          gender: userMoreData.gender,
          birthday: userMoreData.birthday
        }
    },
    signIn: async (root, args, { req }, info) => {
      // const { userId } = req.session

      Auth.checkSignedOut(req)
      // if (userId) {
      //   return User.findById(userId)
      // }
      await Joi.validate(args, signIn, { abortEarly: false })

      const user = await Auth.attemptSignIn(args.email, args.password)

      req.session.userId = user.id

      return true
    },
    signOut: (root, args, { req, res }, info) => {
      Auth.checkSignedIn(req)

      return Auth.signOut(req, res)
    },
    confirmEmail: async (root, args, context, info) => {
      const decode = await jwt.verify(args.key, JWT_EMAIL)
      await User.updateOne({ _id: decode.id }, { $set: { isConfirmed: true } }, (err) => {
        if (err) return false
      })
      return true
    },
    updateBasicInfo: async (rot, args, { req }, info ) => {
      const userBasicInfo = await User.findOneAndUpdate({ _id: req.session.userId}, args)
      return userBasicInfo
    },
    changePassword: async (root, { newPassword, oldPassword }, { req }, info) => {
      Auth.checkSignedIn(req)
      const findUserPass = await User.findById(req.session.userId)
      const comparePass = await compare(oldPassword, findUserPass.password)
      if (comparePass === true) {
        const hashToUpdate = await hash(newPassword, 10)
        await User.findOneAndUpdate({ _id: req.session.userId }, { password: hashToUpdate })
        return true
      }
      // const hashToUpdate = await hash(args.password, 10)
      // const changeActionP = await User.findOneAndUpdate({ _id: req.session.userId }, { password: hashToUpdate })
      // console.log(changeActionP)
      throw new UserInputError('Error changing password. Make sure you input password correct!')
    }
  }
}
