const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const express = require('express');

module.exports = (req,res,next)=>{
    const {authorization } = req.headers;
    if(!authorization)return res.status(422).send({error:"you must be logged in"});

    const token = authorization.replace('Bearer ','');
    jwt.verify(token,'my_code',async (err,payload)=>{
        if (err)return res.status(422).send({error:"you must be logged in"});
        // console.log(payload);   
        const {userId} = payload;
        const user = await User.findById(userId);
        
        req.user=user;
        
        next();
    });
}