const mongoose = require('mongoose');
const itemSchema = require('../items/items.model').itemSchema;

const inventorySchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true
    },
    dateCreated:{
        type: Date
    },
    items:{
        type:[itemSchema]
    }
})
const Inventory = mongoose.model('inventory',inventorySchema)
module.exports.inventorySchema=inventorySchema;
module.exports.Inventory=Inventory;