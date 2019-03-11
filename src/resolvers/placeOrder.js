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
  Admin,
  Delivery } from '../models'
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
      console.log(orderStatusId)
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
    deliveryMan: async (root, args, context, info) => {
      console.log(root)
      if (root.deliveryMan === '') {
        return ''
      }
      return Admin.findById(root.deliveryMan)
    }
  },
  Query: {
    orders: async () => {
      const resOrders = await Order.find({})
      const ordersArray = resOrders.map(({ _id, isOpened, customerId, orderTypeId, datePlaced, datePickUp, deliveryMan, orderStatusId }) => ({
        id: `${_id}`, isOpened, customerId, orderTypeId, datePlaced, datePickUp, deliveryMan, orderStatusId
      }))
      console.log(ordersArray)
      return ordersArray
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
      const updateSingleOrder = await Order.findOneAndUpdate({ _id: args.order }, { orderStatusId: args.orderStatus })
      if (updateSingleOrder) {
        return 'Successfully Updated'
      }
      throw new UserInputError('Error updating order status')
    },
    updateItemStatus: async (root, args, context, info) => {
      const updateSingleOrderItem = await OrderItem.findOneAndUpdate({ _id: args.order }, { itemStatusId: args.itemStatus })
      if (updateSingleOrderItem) {
        return 'Successfully Updated'
      }
      throw new UserInputError('Error updating item status')
    },
    cancelOrder: async (root, args, context, info) => {
      const orderStatus = {
        id: "5c8187b187508328989aae40",
        status: "cancelled"
      }
      const itemStatus = {
        id: "5c81827287508328989aae3c",
        status: "cancelled"
      }
      const updatedOrderStatus = await Order.findOneAndUpdate({ _id: args.order }, { orderStatusId: orderStatus.id })
      const updatedItemStatus = await OrderItem.updateMany({ orderId: args.order }, { itemStatusId: itemStatus.id })

      if (updatedOrderStatus && updatedItemStatus) {
        return 'Successfully cancelled order.'
      }
      throw new UserInputError('Error cancelling order')
    },
    deliveredOrder: async (root, args, context, info) => {
      const orderStatus = {
        id: "5c81879c87508328989aae3f",
        status: "delivered"
      }
      const itemStatus = {
        id: "5c81796287508328989aae3a",
        status: "delivered"
      }

      const waitOrderUpdate = await Order.findOneAndUpdate({ _id: args.order }, { orderStatusId: orderStatus.id })
      const waitItemUpdate = await OrderItem.updateMany({ orderId: args.order }, { itemStatusId: itemStatus.id })
      const waitDeliveryUpdate = await Delivery.findOneAndUpdate({ _id: args.deliveryId }, { isAvailable: true })

      if (waitOrderUpdate && waitItemUpdate && waitDeliveryUpdate) {
        return 'Successfully delivered item.'
      }
    },
    addDelivery: async (root, args, context, info) => {
      const waitAddDelivery = await Order.findOneAndUpdate({ _id: args.order }, { deliveryMan: args.deliveryId })
      const waitUpdateDelivery = await Delivery.findOneAndUpdate({ _id: args.deliveryId }, { isAvailable: false })
      if (waitAddDelivery && waitUpdateDelivery) {
        return 'Successfully added delivery man.'
      }
      throw new UserInputError('Error adding delivery man')
    }
  }
}
