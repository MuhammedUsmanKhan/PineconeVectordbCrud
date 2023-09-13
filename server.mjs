import express from 'express'
// import mongoose from 'mongoose';
const app = express()
const PORT = process.env.PORT || 3000;
import path from 'path';
// mongoose.connect('mongodb://127.0.0.1:27017/Postcrud');
const __dirname = path.resolve();
//app.use(express.json());


import authRouter from './routes/auth.mjs'
import commentRouter from './routes/comment.mjs'
import feedRouter from './routes/feed.mjs'
import postRouter from './routes/post.mjs'


app.use(express.json())


app.use('/api/v1', authRouter)
app.use('/api/v1', postRouter)


app.use(express.static(path.join(__dirname, './reactcrudapp/build')))

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})