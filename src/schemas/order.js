import Joi from 'joi'

export default Joi.object().keys({
  customerId: Joi.string().required().label('category id'),
  statusCode: Joi.string().required().label('product code')
})
