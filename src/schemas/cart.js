import Joi from 'joi'

export default Joi.object().keys({
  productId: Joi.string().required().label('product'),
  userId: Joi.string().required().label('user'),
  quantity: Joi.number().required().label('product quantity')
})
