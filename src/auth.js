import jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-express'
import { User } from './models'
import { SESS_NAME, JWT_EMAIL, MAIL_ADDRESS } from './config'
// import { transporter } from './mail'

export const attemptSignIn = async (email, password) => {
  const message = 'Incorrect email or password. Please try again.'
  const user = await User.findOne({ email })

  if (!user || !await user.matchesPassword(password)) {
    throw new AuthenticationError(message)
  }

  // if (!user.isConfirmed === true) {
  //   const token = await jwt.sign({
  //     email: user.email,
  //     id: user.id
  //   },
  //   JWT_EMAIL,
  //   {
  //     expiresIn: '1d'
  //   })

  //   console.log(token)
  //   const mailOptions = {
  //     from: MAIL_ADDRESS,
  //     to: user.email,
  //     subject: 'Confirm Your Email.',
  //     html: `<p>Please confirm your email follow this link .. ${token}</p>`
  //   }
  //   await transporter.sendMail(mailOptions, (err, info) => {
  //     (err) ? new AuthenticationError('501 error') : console.log(info)
  //   })
  //   throw new AuthenticationError('please confirm your email')
  // }

  return user
}

const signedIn = req => req.session.userId

export const checkSignedIn = req => {
  if (!signedIn(req)) {
    throw new AuthenticationError('You must be signed in.')
  }
}

export const checkSignedOut = req => {
  if (signedIn(req)) {
    throw new AuthenticationError('You must be signed out.')
  }
}

export const signOut = (req, res) => new Promise((resolve, reject) => {
    req.session.destroy(err => {
      if (err) reject(err)

      res.clearCookie(SESS_NAME)
      resolve(true)
    })
  }
)
