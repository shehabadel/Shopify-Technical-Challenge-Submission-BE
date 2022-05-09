const mongoose = require('mongoose');
const itemSchema = require('../items/items.model').itemSchema;

const inventorySchema = new mongoose.Schema({
    name:{
        type: String
    },
    dateCreated:{
        type: Date
    },
    items:{
        type:[itemSchema]
    }

})