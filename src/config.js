export const {
  APP_PORT = 4000,
  NODE_ENV = 'development',

  DB_USERNAME = 'admin',
  DB_PASSWORD = 'secret',
  DB_HOST = 'localhost',
  DB_PORT = 27017,
  DB_NAME = 'habhab',

  SESS_NAME = 'sid',
  SESS_SECRET = 'ssh!secrest',
  SESS_LIFETIME = 1000 * 60 * 60 * 2,

  REDIS_HOST = 'localhost',
  REDIS_PORT = '6379',
  REDIS_PASSWORD = '',

  INV_NUMBER = 'habhab',

  MAIL_ADDRESS = 'suealfred11@gmail.com',
  MAIL_PASSWORD = '23Six907',
  MAIL_SECRET = 'ssh!mailsecreymarvin',

  JWT_EMAIL = 'ssh!seilbymarvinsming',
  JWT_ID = 'ssh!idformarvinbkldsajf'

} = process.env

export const IN_PROD = NODE_ENV === 'production'
