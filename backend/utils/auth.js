const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken')
const response = require('../network/response')

const jwtSecret = process.env.JTW_SECRET

const hashPassword = (password) => {

  if (!password) {
    return null
  }

  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    
    return hash
  } catch (error) {
    console.log(error)
    return null
  }
}

const comparePassword  = (password) => {
  bcrypt.compare(myPlaintextPassword, hash).then(function(result) {
    result == true
  });
}

const issueJWT = (user) => {
    const id = user.id;
  
    const currentDate = new Date()
    const expirationDate = new Date()
    expirationDate.setDate(currentDate.getDate() + 30)

    const payload = {
      sub: id,
      iat: Math.round(currentDate.getTime() / 1000),
      exp: Math.round(expirationDate.getTime() / 1000)
    }
  
    const signedToken = jwt.sign(payload, jwtSecret, {
      algorithm: 'HS256' 
    })
  
    return {
      token: "Bearer " + signedToken,
      expirationDate: expirationDate.toString()
    }
}

const authenticate = (req, res, next) => {

  let token = req.headers['authorization']
  if(!token){
    return response.error(req, res, 401)
  }

  token = token.replace('Bearer ', '')

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      response.error(req, res, 401)
    } else {
      req.id = user.sub
      next()
    }
  })
}

module.exports = {
  hashPassword,
  issueJWT,
  authenticate,
  comparePassword
}