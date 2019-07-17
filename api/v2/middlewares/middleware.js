import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const config = process.env.secret;
const Token = { token: '' }
const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']
  if (!token) {
    return res.status(401).json({
      status:401,
      Error: 'token is not supplied'

    })
  }
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
  }
  Token.token = token
  if (token) {
    jwt.verify(token, config, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          Error: 'Token is not valid'
        })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(401).json({
      status: 401,
      Error: 'Auth token is not supplied'

    })
  }
}

const  asyncHandler = (cb) => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next)
    } catch (err) {
      next(err)
    }
  }
}
export default {
  checkToken,
  asyncHandler,
  Token
}
