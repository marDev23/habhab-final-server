import { gql } from 'apollo-server-express'
export default gql`

  type UserBasicInfo {
    id: ID!
    email: String
    name: String
    mobile: String
  }

  type User {
    id: ID!
    email: String
    name: String
    mobile: String
    address: Address
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
  type UserMoreInfo {
    id: ID
    address: Address
    gender: String
    birthday: Date
  }
   extend type Query {
    me: User
    users: [User!]!
    isSignIn: Boolean
    meMore: UserMoreInfo
  }
  extend type Mutation {
    signUp(email: String!, name: String!, mobile: String, password: String!): Boolean
    addMoreInfo(address: ID!, gender: String!, birthday: Date!): UserMoreInfo
    updateBasicInfo(name: String!, email: String!, mobile: String!): UserBasicInfo
    changePassword(oldPassword: String!, newPassword: String!): Boolean
    signIn(email: String!, password: String!): Boolean
    signOut: Boolean
    changeForgotten(email: String!): String
    verifyForgotten(token: String!, newPassword: String!): String
    confirmEmail(key: String): Boolean
  }
`
