const express = require('express');
const connectDB = require('./config/db');
const postRouter = require('./routes/posts');
const commentRouter = require('./routes/comments');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('SERVER STARTED'));
