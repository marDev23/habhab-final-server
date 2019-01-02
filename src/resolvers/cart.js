import Joi from 'joi'
// import mongoose from 'mongoose'
// import { UserInputError } from 'apollo-server-express'
import { myCart } from '../schemas'
import { Cart, Product } from '../models'
import * as Auth from '../auth'

export default {
  Cart: {
    product: ({ productId }, args, context, info) => {
      return Product.findById(productId)
    }
  },
  Mutation: {
    addToCart: async (root, { productId, quantity }, { req }, info) => {
      // TODO: not auth, validation
      Auth.checkSignedIn(req)
      const cartData = {
        productId, quantity, userId: req.session.userId
      }
      await Joi.validate(cartData, myCart, { abortEarly: false })
      return Cart.create(cartData)
    },
    deleteToCart: async (root, { id }, { req }, info) => {
      // TODO: not auth, validation
      Auth.checkSignedIn(req)
      return Cart.deleteOne({ id })
    },
    updateQuantity: async (root, { id, quantity }, { req }, info) => {
      // TODO: not auth, validation
      Auth.checkSignedIn(req)
      await Cart.findOneAndUpdate(id, { quantity })
      return true
    }
  }
}
