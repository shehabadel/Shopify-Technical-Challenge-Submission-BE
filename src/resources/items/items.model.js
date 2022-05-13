const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name:{
        type: String,
        unique:true
    },
    dateCreated:{
        type: Date,
        default: Date.now()
    },
    price:{
        type:Number
    },
    type:{
        type:String
    },
    category:{
        type:String
    },
    description:{
        type: String
    },
    picture:{
        type: String
    }
})
const Item = mongoose.model('item',itemSchema)
module.exports.Item=Item
module.exports.itemSchema = itemSchema