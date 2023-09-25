const mongoose = require('mongoose');


const RequestedSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Pending"
    }
})


mongoose.model('RequestedBooks',RequestedSchema);