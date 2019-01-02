import { gql } from 'apollo-server-express'

export default gql`

  extend type Query {
    me: User
    users: [User!]!
  }
  extend type Mutation {
    signUp(email: String!, name: String!, mobile: String, password: String!): Boolean
    signIn(email: String!, password: String!): Boolean
    signOut: Boolean
    confirmEmail(key: String): Boolean
  }
  type User {
    id: ID!
    email: String
    name: String
    mobile: String
    address: Address
    birthday: Date
    messages: [Message]
    orders: [Order]
    cart: [Cart]
  }
  type UserInfo {
    id: ID!
    email: String
    name: String
    mobile: String
    address: AddressInfo
  }
`
