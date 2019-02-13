import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    itemStatuses: [ItemStatusWithId!]!
    itemStatus(id: ID!): ItemStatusWithId
  }
  
  extend type Mutation { 
      addItemStatus(status: String!): ItemStatusWithId
  }
  type ItemStatusWithId {
    id: ID!
    status: String!
  }
`