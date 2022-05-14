const mongoose = require('mongoose');
const inventorySchema = require('../inventories/inventories.model').inventorySchema
const warehouseSchema = new mongoose.Schema({
    name:{
        type:String
    },
    location:{
        type:String
    },
    inventories:{
        type:[inventorySchema]
    },
    dateCreated:{
        type:Date,
        default:Date.now()
    },
    numberOfEmployees:{
        type:Number
    }
})
const Warehouse = mongoose.model('warehouse',warehouseSchema)
module.exports.Warehouse=Warehouse