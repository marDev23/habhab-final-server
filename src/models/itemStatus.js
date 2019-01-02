import mongoose from 'mongoose'

const itemStatusSchema = new mongoose.Schema({
  status: String
})

itemStatusSchema.pre('save', function (next) {
  // const err = new Error('something went wrong')
  // an error.
  next()
})
itemStatusSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

const ItemStatus = mongoose.model('Item Status', itemStatusSchema)

export default ItemStatus
