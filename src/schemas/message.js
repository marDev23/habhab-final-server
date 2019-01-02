import Joi from 'joi'

export default Joi.object().keys({
  userId: Joi.string().required().label('category id'),
  title: Joi.string().required().label('product code'),
  body: Joi.string().required().label('category id'),
  isOpened: Joi.boolean().allow('').allow(null).label('zip code')
})
