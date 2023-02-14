const User = require("../models/userModel")
const TokenService = require("../services/TokenService")

const userAuthMiddleware = async (req, res, next) => {
  const token = req.headers.authorization

  if(!token) {
    return res.status(403).json({message: "Token required"})
  }

  const tokenResult = TokenService.verifyToken(token)

  if(!tokenResult) {
    return res.status(403).json({message: "Token is wrong or expired"})
  }

  const user = await User.findById(tokenResult._id)
  if(!user) {
    return res.status(403).json({message: "Wrong user"})
  }

  req.user = user
  next()
}

module.exports = userAuthMiddleware