import Joi from 'joi'
import jwt from 'jsonwebtoken'
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

    }

  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      // TODO: not auth, validation

      Auth.checkSignedOut(req)

      await Joi.validate(args, signUp, { abortEarly: false })

      const user = await User.create(args)

      const token = await jwt.sign({
        email: user.email,
        id: user.id
      },
      JWT_EMAIL,
      {
        expiresIn: '1d'
      })

      console.log(token)
      const mailOptions = {
        from: MAIL_ADDRESS,
        to: user.email,
        subject: 'Confirm Your Email.',
        html: `<p>Please confirm your email follow this link .. ${token}</p>`
      }
      await sender(mailOptions)

      return true
    },
    addMoreInfo: async (root, args, { req }, info) => {
       const userAddress = await User.findOneAndUpdate({ _id: req.session.userId }, { address: args.address })
        if (!userAddress) {
          return false
        }
        return true
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
    }
  }
}
