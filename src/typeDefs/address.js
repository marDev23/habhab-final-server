import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        address(id: ID!): Address
        addresses: [Address!]!
    }
    extend type Mutation { 
        newAddress(
        province: String,
        municipal: String,
        baranggay: String,
        zip: Float!,
        fee: Float!,
        isPickUpAvailable: Boolean!): Address
    }
    type Address {
        id: ID!
        province: String
        municipal: String
        baranggay: String
        zip: Float!
        fee: Float!
        isPickUpAvailable: Boolean
    }
    type AddressInfo {
        id: ID!
        province: String
        municipal: String
        baranggay: String
        zip: Float!
        isPickUpAvailable: Boolean
    }
`
