import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    orderTypes: [OrderTypeWithId!]!
    orderType(id: ID!): OrderTypeWithId
  }
  
  extend type Mutation { 
      addOrderType(type: String!): OrderTypeWithId
  }
  type OrderTypeWithId {
    id: ID!
    type: String!
  }
`