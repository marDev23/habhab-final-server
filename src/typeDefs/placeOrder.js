import { gql } from 'apollo-server-express'
export default gql`
  scalar Date

  type ItemStatus {
    status: String
  }
  type OrderType {
    type: String
  }
  type OrderStatus {
    status: String
  }
  type OrderInvoice {
    invoiceNumber: ID
  }
  type OrderShipment {
    shipmentAddress: Address
  }
  type OrderItem {
    id: ID!
    product: OrderProduct
    itemStatus: ItemStatus
    quantity: Float!
    price: Float!
  }
  type OrderItemList {
    id: ID!
    product: OrderProduct
    itemStatus: ItemStatus
    quantity: Float!
    price: Float!
    order: OrderData
  }
  type Order {
    id: ID!
    customer: UserInfo
    orderStatus: OrderStatus
    orderType: OrderType
    datePlaced: Date
    datePickUp: Date
    isOpened: Boolean
    orderInvoice: OrderInvoice
    orderShipment: OrderShipment
    orderItems: [OrderItem]
  }
  type OrderData {
    id: ID!
    customer: UserInfo
    orderStatus: OrderStatus
    orderType: OrderType
    datePlaced: Date
    datePickUp: Date
    orderInvoice: OrderInvoice
    orderShipment: OrderShipment
  }
  input OrderItemInput {
    id: ID!
    productId: ID
    quantity: Float
    price: Float
  }
  type OrderNumber {
    number: String
  }
  extend type Query {
    orders: [Order!]!
    order(id: ID): Order
    orderItemsList: [OrderItemList!]!
    orderItem(id: ID): OrderItemList
  }
  extend type Mutation {
    placeOrder(
    orderTypeId: ID!,
    datePlaced: Date,
    datePickUp: Date,
    addressId: ID!
    input: [OrderItemInput]): OrderNumber
  }
`
