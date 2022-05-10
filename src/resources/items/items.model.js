const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name:{
        type: String
    },
    dateCreated:{
        type: Date
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