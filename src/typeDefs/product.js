import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    productByCategory(categoryId: ID!): [Product]
    product(name: String!): Product
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
    id: ID!
    name: String!
    description: String!
    price: Float!
  }
`
