import { gql } from 'apollo-server-express'

export default gql`

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  
  extend type Query {
    uploads: [File]
    productByCategory(categoryId: ID!): [Product]
    product(name: String!): Product
    products: [Product!]!
  }
  extend type Mutation {
    singleUpload(file: Upload): Boolean
    createProduct(categoryId: ID!, img: String!, code: String!, name: String!, price: Float, description: String!): Product
  }
  type Product {
    id: ID!
    category: ProductType!
    img: String!
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
