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
      console.log(id)
      Auth.checkSignedIn(req)
      return await Cart.findByIdAndRemove(id)
    },
    updateQuantity: async (root, { id, quantity }, { req }, info) => {
      // TODO: not auth, validation
      Auth.checkSignedIn(req)
      if (quantity === 0) {
        return Cart.findByIdAndRemove(id)
      }
      
      return Cart.findOneAndUpdate({ _id: id }, { quantity: quantity })
    }
  },
  Query: {
    cart: async (root, args, {req}, info) => {
      // console.log(req.session.userId)
      const userCart = await Cart.find({ userId: req.session.userId })
      return userCart.map((x) => ({
        id: `${x.id}`,
        productId: x.productId,
        quantity: x.quantity,
        userId: x.userId
      }))
    }
  }
}
