import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  userId: String,
  title: String,
  body: String,
  isOpened: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

messageSchema.pre('save', function (next) {
  // const err = new Error('something went wrong')
  // an error.
  next()
})
messageSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

const Message = mongoose.model('Message', messageSchema)

export default Message
