import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        myCart: [Cart!]!
    }
    extend type Mutation { 
        addToCart(productId: ID, quantity: Float) : Cart
        updateQuantity(id: ID, quantity: Float): Boolean
        deleteToCart(id: ID): Boolean
    }
    type Cart {
        id: ID!
        product: ProductCart
        quantity: Float!
    }
`
