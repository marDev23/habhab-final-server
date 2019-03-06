import Joi from 'joi'
import shortid from 'shortid'
// import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import {
  order,
  items,
  shipment,
  invoice,
  myMessage } from '../schemas'
import {
  Order,
  OrderItem,
  Shipment,
  Invoice,
  Message,
  Cart,
  User,
  OrderType,
  OrderStatus,
  Product,
  ItemStatus,
  Address,
  Admin } from '../models'
// import { transporter } from '../mail'
// import { MAIL_ADDRESS } from '../config'
import { placeOrderMail } from '../mail-template'
import * as Auth from '../auth'
export default {
  OrderData: {
    customer: async ({ customerId }, args, context, info) => {
      return User.findById(customerId)
    },
    orderStatus: ({ orderStatusId }, args, { req }, info) => {
      // Auth.checkSignedIn(req)
      return OrderStatus.findById(orderStatusId)
    },
    orderType: ({ orderTypeId }, args, { req }, info) => {
      // Auth.checkSignedIn(req)
      return OrderType.findById(orderTypeId)
    },
    orderShipment: async ({ id }, args, context, info) => {
      const shipmentData = await Shipment.findOne({ orderId: id })
      return {
        id: shipmentData.id,
        addressId: shipmentData.addressId
      }
    },
    orderInvoice: async ({ id }, args, context, info) => {
      // console.log(root)
      return Invoice.findOne({ orderId: id })
    }
  },
  OrderItemList: {
    order: async ({ orderId }, args, context, info) => {
      return Order.findById(orderId)
    },
    product: ({ productId }, args, { req }, info) => {
      // Auth.checkSignedIn(req)
      // console.log(productId)
      return Product.findById(productId)
    },
    itemStatus: ({ itemStatusId }, args, { req }, info) => {
      // Auth.checkSignedIn(req)
      // console.log(root)
      return ItemStatus.findById(itemStatusId)
    }
  },
  OrderShipment: {
    shipmentAddress: async ({ addressId }, args, context, info) => {
      return Address.findById(addressId)
    }
  },
  OrderItem: {
    itemStatus: ({ itemStatusId }, args, { req }, info) => {
      // Auth.checkSignedIn(req)
      return ItemStatus.findById(itemStatusId)
    },
    product: ({ productId }, args, { req }, info) => {
      // Auth.checkSignedIn(req)
      return Product.findById(productId)
    }
  },
  Order: {
    orderStatus: ({ orderStatusId }, args, { req }, info) => {
      // Auth.checkSignedIn(req)
      return OrderStatus.findById(orderStatusId)
    },
    orderType: ({ orderTypeId }, args, { req }, info) => {
      // Auth.checkSignedIn(req)
      return OrderType.findById(orderTypeId)
    },
    orderItems: ({ id }, args, { req }, info) => {
      // Auth.checkSignedIn(req)
      return OrderItem.find({ orderId: id })
    },
    orderShipment: async ({ id }, args, context, info) => {
      const shipmentData = await Shipment.findOne({ orderId: id })
      return {
        id: shipmentData.id,
        addressId: shipmentData.addressId
      }
    },
    orderInvoice: async ({ id }, args, context, info) => {
      // console.log(root)
      return Invoice.findOne({ orderId: id })
    },
    customer: async ({ customerId }, args, context, info) => {
      return User.findById(customerId)
    },
    acknowledgeBy: async (root, args, context, info) => {
      // console.log(root)
      if (root.acknowledgeBy === '') {
        return ''
      }
      return Admin.findById(root.acknowledgeBy)
    }
  },
  Query: {
    orders: async () => {
      const resOrders = await Order.find({})
      return resOrders.map(({ _id, isOpened, customerId, orderTypeId, datePlaced, datePickUp, acknowledgeBy }) => ({
        id: `${_id}`, isOpened, customerId, orderTypeId, datePlaced, datePickUp, acknowledgeBy
      }))
    },
    order: async (root, args, context, info) => {
      // console.log(args.id)
      return Order.findById(args.id)
    },
    orderItemsList: async () => {
      return OrderItem.find({})
    },
    orderItem: async (root, { id }, context, info) => {
      return OrderItem.findById(id)
    }
  },
  Mutation: {
    placeOrder: async (root, args, { req }) => {
      Auth.checkSignedIn(req)
      const { input } = args

      const finalOrder = {
        customerId: req.session.userId,
        orderTypeId: args.orderTypeId,
        datePlaced: args.datePlaced,
        datePickUp: args.datePickUp
      }
      await Joi.validate(finalOrder, order, { abortEarly: false })
      const resolvedOrder = await Order.create(finalOrder)
      // console.log(resolvedOrder)
      const { id } = resolvedOrder
      const orderId = id

      const finalItem = input.map(({ productId, itemStatusId, quantity, price }) => ({
        orderId, productId, itemStatusId, quantity, price }))
      await Joi.validate(finalItem, items, { abortEarly: false })
      await OrderItem.insertMany(finalItem)

      const itemsIds = input.map(x => x.id)
      await Cart.deleteMany({ _id: { $in: itemsIds } })

      const finalShipment = { addressId: args.addressId, orderId }
      await Joi.validate(finalShipment, shipment, { abortEarly: false })
      await Shipment.create(finalShipment)

      const invoiceGen = await shortid.generate()
      const finalInvoice = {
        orderId,
        invoiceNumber: invoiceGen
      }
      await Joi.validate(finalInvoice, invoice, { abortEarly: false })
      await Invoice.create(finalInvoice)

      const finalMessage = {
        title: 'Thank you for your order.',
        body: `Your Order# is ${orderId} and now has being processed`,
        userId: req.session.userId
      }
      await Joi.validate(finalMessage, myMessage, { abortEarly: false })
      await Message.create(finalMessage)

      const finalUser = await User.findById(req.session.userId)
      // const finalAddress = Address.findById.(args.addressId)
      // const freet = itemSaved.map((x) => ({ price: x.price})
      await placeOrderMail(finalUser, orderId, args)

      return { number: orderId }
    },
    updateOrderStatus: async (root, args, { req }, info) => {
      console.log(args)
      const updateSingleOrder = await Order.findOneAndUpdate({ _id: args.order }, { acknowledgeBy: req.session.userId, orderStatusId: args.orderStatus })
      if (updateSingleOrder) {
        return 'Successfully Updated'
      }
      throw new UserInputError('Error updating order')
    }
  }
}
