const mongoose = require('mongoose');
const express = require('express');
const User = mongoose.model('User');
const Fine = mongoose.model('Fine');
const jwt = require('jsonwebtoken');

const route = express.Router();

route.post('/signup',async (req,res)=>{
    const {name,Email,password,role} = req.body;

    if(!Email || !password || !name)return res.status(422).send("Invalid Email or password ")
    const email = Email.toLowerCase();
    try{
        console.log(email);
    const user = new User({name,email ,password,role});
    
    await user.save();
    const fine = new Fine({userId:user._id,fine:0});
    await fine.save();
    const token = jwt.sign({userId :user._id},'my_code');
    res.send({token});
    }
    catch (err){
        console.log(err);
        return res.status(422).send("email already registered");
    }
})

route.post('/signin',async (req,res)=>{
    const {Email,password}=req.body;
    if(!Email || !password)return res.status(422).send("invalid email or passwrd");
    const email = Email.toLowerCase();
    const user = await User.findOne({email});
    if(!user)return res.status(422).send("invalid email or password");
    try{
    await user.comparePasswords(password);
    const token = jwt.sign({userId:user._id},'my_code');
    return res.send({user,token});
    }
    catch(err){
       console.log(err);
       res.send("invalid email or password");
    }


})

module.exports = route;