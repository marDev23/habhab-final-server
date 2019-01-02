import Joi from 'joi'

export default Joi.object().keys({
  province: Joi.string().required().label('category id'),
  municipal: Joi.string().required().label('product code'),
  baranggay: Joi.string().required().label('category id'),
  zip: Joi.number().required().label('zip code'),
  fee: Joi.number().required().label('shpment fee')
})
