const Inventory = require('./inventories.model').Inventory

const createInventory = ()=> async(req,res)=>{
    try {
        const doc = await Inventory.create({...req.body})
        res.status(201).json({data:doc})
    } catch (error) {
        console.error(e)
        res.status(400).end()
    }
}
const readInventory = () => async(req,res)=>{
    try {
        const doc = await Inventory.find({})
        if(!doc){
            return res.status(404).end()
        }
        res.status(200).json({data:doc})
    } catch (error) {
        console.error(e)
        res.status(400).end()
    }
}

const readOneInventory = () => async(req,res)=>{
    try {
        const id = req.params.id
        const doc = await Inventory.findOne({_id:id})
        if(!doc){
            return res.status(404).end()
        }
        res.status(200).json({data:doc})
    } catch (error) {
        console.error(e)
        res.status(400).end()
    }
}
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
    } catch (error) {
        console.error(e)
        res.status(400).end()
    }
}

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
    } catch (error) {
        console.error(e)
        res.status(400).end()
    }
}

const inventoryCRUD = {
    createInventory: createInventory(),
    readInventory: readInventory(),
    updateInventory: updateInventory(),
    deleteInventory: deleteInventory(),
    readOneInventory: readOneInventory()
}
module.exports.inventoryCRUD = inventoryCRUD