const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/users');
const verifyToken = require('./middlewares/verifyToken');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/api/users', authRouter);
app.use('/api/posts', verifyToken, postRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
