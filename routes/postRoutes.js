const router = require('express').Router()
const { createPost, deletePost, getUserPosts, getAllPosts, likePost } = require('../controllers/postController')
const userAuthMiddleware = require("../middlewares/userAuthMiddleware")


router.post('/create', userAuthMiddleware, createPost)
router.post('/delete', userAuthMiddleware, deletePost)
router.get('/getUserPosts', userAuthMiddleware, getUserPosts)
router.get('/getAll', userAuthMiddleware, getAllPosts)
router.post('/likePost', userAuthMiddleware, likePost)

module.exports = router