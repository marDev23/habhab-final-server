import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    product(id: ID!): Product
    products: [Product!]!
  }
  extend type Mutation {
    createProduct(categoryId: ID!, code: String!, name: String!, price: Float, description: String!): Product
  }
  type Product {
    id: ID!
    category: ProductType!
    code: String!
    name: String!
    price: Float!
    description: String!
    createdAt: String!
  }
  type OrderProduct {
    name: String!
    description: String!
  }
  type ProductCart {
    name: String!
    description: String!
    price: Float!
  }
`
