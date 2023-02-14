const jwt = require('jsonwebtoken')

class TokenService {
  generateToken(data) {
    return jwt.sign(data, process.env.JWT_SECRET)
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET)
    } catch(e) {
      return false
    }
  }
}


// const user = {
//   name: 'john',
//   age: 23
// }

// const tokenService = new TokenService()

// const token = tokenService.generateToken(user) //  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiam9obiIsImFnZSI6MjMsImlhdCI6MTUxNjIzOTAyMn0.bpxKZfvtC5MI9Nl898tqgcPHyyMg6UI8CpQId7yKuiU

// const result = tokenService.verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiam9obiIsImFnZSI6MjMsImlhdCI6MTUxNjIzOTAyMn0.bpxKZfvtC5MI9Nl898tqgcPHyyMg6UI8CpQId7yKuiU')

module.exports = new TokenService()