import nodemailer from 'nodemailer'
import { UserInputError } from 'apollo-server-express'
import { MAIL_ADDRESS, MAIL_PASSWORD } from './config'

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: MAIL_ADDRESS,
    pass: MAIL_PASSWORD
  }
})

export const sender = (mailObj) => {
  transporter.sendMail(mailObj, (err, info) => {
    if (err) return new UserInputError('501 error')
    console.log(info)
  })
}
