const router = require("express").Router()
const { userLogin, userSignup, checkAuth, getUserById } = require("../controllers/userController")
const userAuthMiddleware = require("../middlewares/userAuthMiddleware")


router.post('/login', userLogin)
router.post ('/signup', userSignup)

router.get('/checkAuth', userAuthMiddleware, checkAuth)

router.get('/getUserById', userAuthMiddleware, getUserById)

module.exports = router