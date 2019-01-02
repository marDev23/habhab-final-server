import Joi from 'joi'

export default Joi.object().keys({
  categoryId: Joi.string().required().label('category id'),
  code: Joi.string().required().label('product code'),
  name: Joi.string().required().label('product name'),
  price: Joi.number().required().label('product price'),
  description: Joi.string().required().label('product description')
})
