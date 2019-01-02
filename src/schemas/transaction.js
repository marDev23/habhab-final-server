import Joi from 'joi'

const customerId = Joi.string().required().label('customer id')
const orderStatusId = Joi.string().allow('').allow(null).label('order status id')
const orderTypeId = Joi.string().required().label('order type id')
const datePlaced = Joi.label('date placed')
const datePickUp = Joi.label('date pick-up')
const productId = Joi.string().required().label('product id')
const orderId = Joi.string().required().label('order id')
const itemStatusId = Joi.string().allow('').allow(null).label('item status id')
const quantity = Joi.number().required().label('quantity')
const price = Joi.number().required().label('price')
const addressId = Joi.string().required().label('address id')
const invoiceNumber = Joi.string().required().label('invoice number')

export const order = Joi.object().keys({
  customerId, orderStatusId, orderTypeId, datePlaced, datePickUp
})

export const items = Joi.array().items({
  productId, orderId, itemStatusId, quantity, price
})

export const shipment = Joi.object().keys({
  orderId, addressId
})

export const invoice = Joi.object().keys({
  orderId, invoiceNumber
})
