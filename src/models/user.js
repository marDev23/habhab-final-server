import mongoose from 'mongoose'
import { hash, compare } from 'bcryptjs'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: email => User.doesntExist({ email }),
      message: ({ value }) => `email has already been taken.` // TODO: security
    }
  },
  name: String,
  mobile: {
    type: String,
    validate: {
      validator: mobile => User.doesntExist({ mobile }),
      message: ({ value }) => `mobile number has already taken.`
    }
  },
  address: String,
  password: String,
  isConfirmed: {
    type: Boolean,
    default: false
  },
  gender: String,
  address: String,
  birthday: String,
}, {
  timestamps: true
})

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10)
  }
})

userSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

userSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
