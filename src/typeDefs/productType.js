import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    productType(category: String!): ProductType
    productTypes: [ProductType!]!
  }
  extend type Mutation {
    createProductType(category: String!): ProductType
  }
  type ProductType {
    id: ID!
    category: String!
    createdAt: String!
  }
`
