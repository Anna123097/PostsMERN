const {model, Schema} = require('mongoose')

const postSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
    default: []
  }]
}, {
  timestamps: true
})

module.exports = model('post', postSchema)