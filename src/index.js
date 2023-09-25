require('./Models/User');
require('./Models/fine');
require('./Models/issued');
require('./Models/returned')
require('./Models/books');
require('./Models/request');
const express = require('express');
const mongoose = require('mongoose');
const route = require('./Routes/authRoutes');
const bodyparse = require('body-parser');
const requireAuth = require('./Routes/requireAuth');
const authCheck = require('./middleware/authcheck');
const userRoutes = require('./Routes/userRoutes')
const cors = require('cors');
const app = express();
const Books = mongoose.model('Books');


app.use(cors());


app.use(bodyparse.json());
app.use(bodyparse.urlencoded({ extended: true }))

app.get('/search/:key',async(req,res)=>{
    const query = req.params.key;
    console.log(req.params.key);
    console.log(query);
    let data = await Books.find({
        "$or":[
            {category:{$regex:req.params.key}}
        ]
    }).limit(10);
    res.send(data);
})

app.use('/auth',route);
app.use('/api',userRoutes);

const dbUri = 'mongodb+srv://ydvayush06:O7ayEQURTA5cezxN@cluster0.co9dafx.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbUri);


app.get('/',authCheck,(req,res)=>{
    res.send(`your email :${req.user.email}`);    
})

module.exports=app.listen(3600,()=>{
    console.log("server started at port 3500");
})


mongoose.connection.on('connected',()=>{
    console.log("connected to mongo");
})

mongoose.connection.on('disconnected',()=>{
    console.log("disconnected to mongo");
})

mongoose.connection.on('error',(err)=>{
    console.error(err);
})
