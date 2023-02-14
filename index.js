const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
require('dotenv').config()



const app = express()
app.use(cors())
app.use(express.json())

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')


app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

//


const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
  mongoose.connect(process.env.MONOGDB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
    .then(() => {
      console.log('DB connected');
    }).catch((err) => {
      console.log(err);
    })
})