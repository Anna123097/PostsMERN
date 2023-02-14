const bcrypt = require('bcrypt')
const UserDTO = require('../dtos/UserDTO')
const User = require('../models/userModel')
const TokenService = require('../services/TokenService')
const Post = require('../models/postModel')

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body
    const candidate = await User.findOne({ username })

    if (!candidate) {
      return res.status(400).json({ message: "User not found" })
    }
    const isPasswordValid = await bcrypt.compare(password, candidate.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Wrong passwword" })
    }

    const userPosts = await Post.find({author: candidate._id})
    const user = { ...new UserDTO(candidate, userPosts) }

    const token = TokenService.generateToken(user)


    res.json({ user, token })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const userSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const emailCheck = await User.exists({ email })

    if (emailCheck) {
      return res.status(400).json({ message: "User with this email already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await new User({ username, email, password: hashedPassword }).save()

    const user = { ...new UserDTO(newUser) }

    const token = TokenService.generateToken(user)

    res.json({ user, token })

  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const checkAuth = async (req, res) => {
  try {
    const userPosts = await Post.find({author: req.user._id}).populate('author',  'username email')

    const user = { ...new UserDTO(req.user, userPosts) }
    res.json({ user })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}



const getUserById = async (req, res) => {
  try {
    const {id} = req.query

    const user = await User.findById(id, 'username email')
    if(!user) {
      return res.status(401).json({message: 'user not found'})
    }

    res.json({user})

  } catch(e) {
    res.status(500).json({message: e.message})
  }
}


module.exports = { userLogin, userSignup, checkAuth, getUserById }