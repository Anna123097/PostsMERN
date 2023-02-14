const Post = require('../models/postModel')

const createPost = async (req, res) => {
  try {
    const { description } = req.body
    const author = req.user

    const post = await (await new Post({ description, author: author._id }).save()).populate('author', 'username')
    res.json({ post })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const deletePost = async (req, res) => {
  try {
    const {deleteId} = req.body
    const author = req.user

    const foundPost = await Post.findOne({_id: deleteId})
    if(!foundPost) {
      return res.status(404).json({ message: 'Post not found' }) //404 - not found
    }

    if(foundPost.author !== author._id) { 
      return res.status(400).json({ message: 'You are not the author of this post' }) // 400 -bad request
    }

    await Post.findByIdAndDelete(foundPost._id)

    res.json({message: 'Post was deleted!', deletedId: deleteId})

  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const getUserPosts = async(req, res) => {
  try {
    const{id, page = 1} = req.query
    const limit = 2
    const user = req.user
        
    const userPosts = await Post.find({author: id}).sort([['createdAt', -1]]).limit(limit).skip((page-1) * limit).populate('author', 'username').lean()

    const result = userPosts.map(post => {
      const isLiked = post.likes.findIndex(like => like === user._id) !== -1
      return {...post, isLiked}
    })

    res.json({posts: result})
    

  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const getAllPosts = async(req, res) => {
  try {
    const{page = 1} = req.query
    const user = req.user

    const limit = 15

    const allPosts = await Post.find().sort([['createdAt', -1]]).limit(limit).skip((page-1) * limit).populate('author', 'username').lean()
    const result = allPosts.map(post => {
      const isLiked = post.likes.findIndex(like => like === user._id) !== -1
      return {...post, isLiked}
    })
    res.json({posts: result})

  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const likePost = async (req, res) => {
  try {
    const{postId} = req.body
    const user = req.user


    const post = await Post.findById(postId)
    if(!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const likedIndex = post.likes.findIndex(liker => String(liker) === String(user._id))
console.log(likedIndex, user);
    if(likedIndex !== -1) {
      post.likes.slice(likedIndex, 1)
    } else {
      post.likes.push(user._id)
    }

    await post.save()
    res.json({isLiked: likedIndex === -1, post})


  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

module.exports = { createPost, deletePost, getUserPosts, getAllPosts, likePost }