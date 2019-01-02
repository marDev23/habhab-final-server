import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    orders: [Order!]!
  }
  
  extend type Mutation { 
      placeOrder(customerId: ID! statusCode: ID!): Order
  }
  type Order {
    id: ID!
    orderStatus: OrderStatus
    orderType: OrderType
    datePlaced: Date
    datePickUp: Date
  }
`
