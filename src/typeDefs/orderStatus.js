import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    orderStatuses: [OrderStatusWithId!]!
    orderStatus(id: ID!): OrderStatusWithId
  }
  
  extend type Mutation { 
      addOrderStatus(status: String!): ItemStatusWithId
  }
  type OrderStatusWithId {
    id: ID!
    status: String!
  }
`