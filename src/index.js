import mongoose from 'mongoose'
import express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import {
  APP_PORT,
  IN_PROD,
  DB_HOST,
  DB_NAME,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME,
  REDIS_HOST,
  REDIS_PORT
} from './config'

(async () => {
  try {
    await mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`,{ useNewUrlParser: true })
// mongodb+srv://habhab-user:<PASSWORD>@habhab-fr4kc.mongodb.net/test?retryWrites=true
// mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`,{ useNewUrlParser: true }
    const app = express()

    app.disable('x-powered-by')

    const RedisStore = connectRedis(session)

    const store = new RedisStore({
      host: REDIS_HOST,
      port: REDIS_PORT
    })

    app.use(session({
      store,
      name: SESS_NAME,
      secret: SESS_SECRET,
      resave: true,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        maxAge: parseInt(SESS_LIFETIME),
        secure: false
      }
    }))

    const corsOptions = {
      origin: ['http://localhost:3000', 'http://localhost:5000', 'http://192.168.43.228:3000', '69.0.3497.100'],
      credentials: true,
    }

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: IN_PROD ? false : {
        settings: {
          'request.credentials': 'include'
        }
      },
      context: ({ req, res }) => ({ req, res })
    })

    server.applyMiddleware({ app, cors: corsOptions })

    app.listen({ port: APP_PORT }, () =>
      console.log(`http://localhost:${APP_PORT}${server.graphqlPath}`)
    )
  } catch (e) {
    console.error(e)
  }
})()
