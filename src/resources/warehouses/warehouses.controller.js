const Warehouse = require('../warehouses/warehouses.model').Warehouse
const Inventory = require('../inventories/inventories.model').Inventory
const createWarehouse = ()=> async(req,res)=>{
    try {
        const inventories =req.body.inventories
        if(inventories.length>0){
            try {
                var inventoriesDocument  = await Inventory.find({name: {$all:inventories}})
                console.log(inventoriesDocument)
            } catch (error) {
                console.log('No inventories with these names')
            }
            const doc = await Warehouse.create({...req.body, inventories: inventoriesDocument})
            return res.status(201).json({data:doc})
        }
        else{
            const doc = await Warehouse.create({...req.body})
            return res.status(201).json({data:doc})
        }
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}
const readWarehouse = () => async(req,res)=>{
    try {
        const doc = await Warehouse.find({})
        if(!doc){
            return res.status(404).end()
        }
        res.status(200).json({data:doc})
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

const readOneWarehouse = () => async(req,res)=>{
    try {
        const id = req.params.id
        const doc = await Warehouse.findOne({_id:id})
        if(!doc){
            return res.status(404).end()
        }
        res.status(200).json({data:doc})
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}
const updateWarehouse = () => async(req,res)=>{
    try {
        const doc = await Warehouse.findOneAndUpdate(
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

const deleteWarehouse = () => async(req,res)=>{
    try {
        const id= req.params.id
        const doc = await Warehouse.findByIdAndRemove({_id:id})
        if(!doc){
            return res.status(404).end()
        }
        res.status(200).json({
            message:`Successfully deleted the warehouse of ID ${id}`,
            data: doc
        })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

const warehouseCRUD = {
    createWarehouse: createWarehouse(),
    readWarehouse: readWarehouse(),
    updateWarehouse: updateWarehouse(),
    deleteWarehouse: deleteWarehouse(),
    readOneWarehouse: readOneWarehouse()
}
module.exports.warehouseCRUD = warehouseCRUD