require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {DATABASE} = process.env;
const CommentModel = require('./models/coment')
const PostModel = require('./models/post')
const port = process.env.PORT || 3000;


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (err) throw err
    console.log('MONGO DB DataBase Connected')
})


// Get all data
app.get('/post', async (req, res) => {
    
    const posts = await PostModel.find({}).toArray()
    res.json(posts)
})

app.get('/comments',async (req, res) => {
    
    const comments = await CommentModel.find({}).toArray()
    res.json(comments)
})



// Add data
app.post('/post', async (req, res) => {

    const postDoc = await PostModel.create({ name: req.body.name })

    const result = await postDoc.save()

    res.json(result)
})


app.post('/addcomment/:id', async (req, res) => {
    try{
        
    const foundPostDoc = await PostModel.findById(req.params.id)

    const commentDoc = await CommentModel.create(req.body)

    commentDoc.post = foundPostDoc

    const commentResult = await commentDoc.save()

    foundPostDoc.comments.push(commentDoc)

    const postResult = await foundPostDoc.save()
    console.log("postResult", postResult)

    res.json({commentResult, postResult})
    }  catch(err){
        console.log(err)
    }
})



// update data

app.put('/post/:id',async (req, res)=> {
    const updates = {
        $set: {title : req.body.title,
                content : req.body.content
        }
    }
    // const foundPostDoc = await PostModel.findById(req.params.id)
    const updateResult = await PostModel.updateOne({_id: req.params.id}, updates )
    res.json({updateResult})
})


app.put('/comment/:id', async(req,res) => {
    const updates = {
        $set: {title : req.body.text
        }
    }
    // const foundPostDoc = await PostModel.findById(req.params.id)
    const updateResult = await CommentModel.updateOne({_id: req.params.id}, updates )
    res.json({updateResult})
})


// delete data
app.delete('/comment/:id', async (req,res) =>{
    const deleteResult = await CommentModel.deleteOne({_id: req.params.id})

    res.json({deleteResult})
})

app.delete('/post/:id', async (req,res) =>{
    const deleteResult = await PostModel.deleteOne({_id: req.params.id})

    res.json({deleteResult})
})


app.listen(port, ()=> console.log('SERVER STARTED'))