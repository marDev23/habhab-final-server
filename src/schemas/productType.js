import Joi from 'joi'

export default Joi.object().keys({
  category: Joi.string().required().label('category name')
})
