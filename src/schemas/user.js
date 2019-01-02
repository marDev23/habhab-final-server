import Joi from 'joi'

const email = Joi.string().email().required().label('e-mail')
const name = Joi.string().max(254).required().label('name')
const mobile = Joi.string().required().label('mobile number')
const password = Joi.string().min(8).max(50).regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*$/).required().label('password').options({
  language: {
    string: {
      regex: {
        base: 'must have at least one lowercase letter, one uppercase letter, and one digit'
      }
    }
  }
})

export const signUp = Joi.object().keys({
  email, name, mobile, password
})

export const signIn = Joi.object().keys({
  email, password
})
