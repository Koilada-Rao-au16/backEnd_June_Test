require('dotenv').config()
const express = require("express")
const expHbs = require('express-handlebars')
const app = express()
const {Base64} = require('js-base64');
const expressUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
const {cloudName , apiKey, apiSecret} = process.env;

// handlebars engine setup

app.engine('hbs', expHbs({
    extname: 'hbs',
    defaultLayout: false

}))
app.set('view engine', 'hbs')
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({limit: '5mb', extended: false}));
app.use(expressUpload())
app.use(express.static('public'))



// cloudniry db connect 

cloudinary.config({
    
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    
})

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/home', async (req, res) => {
    console.log(req.files)
    
    
    try{
        const bas64FormattedString1 = Base64.encode(req.files.image.data)
        const uploadResult1 = await cloudinary.uploader.upload(`data:${req.files.image.mimetype};base64,${bas64FormattedString1}`)
        res.render('final')
    }catch(err){
        console.log(err)
        res.send("Error")
    }

})


app.listen(3000, () => console.log('SERVER RUNNING'))