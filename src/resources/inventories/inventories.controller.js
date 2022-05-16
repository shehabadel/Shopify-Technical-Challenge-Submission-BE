const Inventory = require('./inventories.model').Inventory
const Item = require('../items/items.model').Item

/**
 * POST Inventory
 */
const createInventory = ()=> async(req,res)=>{
    try {
        const doc = await Inventory.create({...req.body})
        return res.status(201).json({data:doc})
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}
/**
 * 
 * GET All Inventories
 */
const readInventory = () => async(req,res)=>{
    try {
        const doc = await Inventory.find({})
        if(!doc){
            return res.status(404).end()
        }
        return res.status(200).json({data:doc})
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}
/**
 * 
 * GET One Inventory based on id
 */
const readOneInventory = () => async(req,res)=>{
    try {
        const id = req.params.id
        const doc = await Inventory.findOne({_id:id})
        if(!doc){
            return res.status(404).end()
        }
        res.status(200).json({data:doc})
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}
/**
 * 
 * PUT Inventory based on id
 */
const updateInventory = () => async(req,res)=>{
    try {
        const doc = await Inventory.findOneAndUpdate(
            {_id: req.params.id},
            req.body
        )
        if(!doc){
            return res.status(400).end()
        }
        res.status(200).json({data:doc})
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}
/**
 * 
 * DELETE Inventory based on id
 */
const deleteInventory = () => async(req,res)=>{
    try {
        const id= req.params.id
        const doc = await Inventory.findByIdAndRemove({_id:id})
        if(!doc){
            return res.status(404).end()
        }
        res.status(200).json({
            message:`Successfully deleted the Inventory of ID ${id}`,
            data: doc
        })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}
/**
 * 
 * Add an Item to an Inventory based on
 * Inventory (id), Item (name)
 */
const addItemToInventory = () => async(req,res)=>{
    try {
        //Retreive the inventory id from the URL Parameters
        const inventoryID= req.params.id
        //Retreive the item name from the request body
        const itemName= req.body.name;

        //Fetch the item document from the database based on the request body
        const itemDoc = await Item.find({name:itemName})
        if(!itemDoc)
        {
            return res.status(404).json(`Can't find item with this name`)
        }
        console.log(itemDoc)
        //Update the inventory with the the new item document added to its item list
        const inventoryDoc = await Inventory.findById({_id:inventoryID})
        console.log(inventoryDoc)
        var inventoryList = inventoryDoc.items
        console.log('Updated')
        inventoryList.push(itemDoc)
        console.log(inventoryList)

        const updatedInventoryDoc = await Inventory.findByIdAndUpdate({_id:inventoryID},{$push:{items:itemDoc}})
        if(!updatedInventoryDoc){
            return res.status(404).end()
        }
        res.status(200).json({data: updatedInventoryDoc})
    } catch (e) {
        console.error(e)
    }
}
/**
 * 
 * Remove an Item from Inventory based on
 * Inventory (id), Item (name)
 */
const removeItemFromInventory = () => async(req,res)=>{
    try {
        //Retreive the inventory id from the URL Parameters
        const inventoryID= req.params.id
        //Retreive the item name from the request body
        const itemName= req.body.name;

        //Update the inventory with the the new item document added to its item list
        const inventoryDoc = await Inventory.findById({_id:inventoryID})
        if(!inventoryDoc){
            return res.status(404).end()
        }
        var inventoryItemsList = inventoryDoc.items
        //Retreive the index of the item we want to delete from the inventory items list
        let i = inventoryItemsList.indexOf(itemName)
        //Remove the item from the item list
        inventoryItemsList.splice(i,1)

        //Update the inventory with the new item list
        const updatedInventoryDoc = await Inventory.findByIdAndUpdate({_id:inventoryID},{items:inventoryItemsList})

        if(!updatedInventoryDoc){
            return res.status(404).end()
        }
        res.status(200).json({data: updatedInventoryDoc})
    } catch (e) {
        console.error(e)
    }
}
const inventoryCRUD = {
    createInventory: createInventory(),
    readInventory: readInventory(),
    updateInventory: updateInventory(),
    deleteInventory: deleteInventory(),
    readOneInventory: readOneInventory(),
    addItemToInventory: addItemToInventory(),
    removeItemFromInventory: removeItemFromInventory()
}
module.exports.inventoryCRUD = inventoryCRUD