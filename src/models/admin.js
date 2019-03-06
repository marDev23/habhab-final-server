import mongoose from 'mongoose'
import { hash, compare } from 'bcryptjs'

const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  position: String,
  location: String,
  password: String
}, {
  timestamps: true
})

adminSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10)
  }
})

adminSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

adminSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password)
}

const Admin = mongoose.model('Admin', adminSchema)

export default Admin
