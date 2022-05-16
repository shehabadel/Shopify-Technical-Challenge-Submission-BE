const Warehouse = require('../warehouses/warehouses.model').Warehouse
const Inventory = require('../inventories/inventories.model').Inventory
const createWarehouse = () => async (req, res) => {
    try {
        const doc = await Warehouse.create({ ...req.body })
        if (!doc) {
            return res.status(404).end()
        }
        return res.status(201).json({ data: doc })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}
const readWarehouse = () => async (req, res) => {
    try {
        const doc = await Warehouse.find({}).populate('inventory')
        if (!doc) {
            return res.status(404).end()
        }
        res.status(200).json({ data: doc })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

const readOneWarehouse = () => async (req, res) => {
    try {
        const id = req.params.id
        const doc = await Warehouse.findOne({ _id: id }).populate('inventory')
        if (!doc) {
            return res.status(404).end()
        }
        res.status(200).json({ data: doc })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}
const updateWarehouse = () => async (req, res) => {
    try {
        const doc = await Warehouse.findOneAndUpdate(
            { _id: req.params.id },
            req.body
        ).populate('inventory')
        if (!doc) {
            return res.status(400).end()
        }
        res.status(200).json({ data: doc })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

const deleteWarehouse = () => async (req, res) => {
    try {
        const id = req.params.id
        const doc = await Warehouse.findByIdAndRemove({ _id: id })
        if (!doc) {
            return res.status(404).end()
        }
        res.status(200).json({
            message: `Successfully deleted the warehouse of ID ${id}`,
            data: doc
        })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}
/**
 * 
 * Assign an inventory to warehouse based on
 * Warehouse (id), inventory (name)
 */
const assignInventory = () => async (req, res) => {
    try {
        const inventoryName = req.body.inventory
        const inventoryDoc = await Inventory.findOne({ name: inventoryName })
        if (!inventoryDoc) {
            return res.status(404).json('No Inventory with this ID exists!')
        }
        const inventoryDocID=inventoryDoc._id
        const warehouseID = req.params.id
        const doc = await Warehouse.findByIdAndUpdate(
            { _id: warehouseID },
            { ...req.body, inventory: inventoryDocID }
        )
        if (!doc) {
            return res.status(404).end()
        }
        return res.status(200).json({
            message: 'Assigned Inventory to warehouse successfully',
            data: doc
        })
    } catch (error) {
        console.error(error)
        res.status(400).end()
    }
}
/**
 * 
 * Remove an inventory from warehouse based on
 * Warehouse (id), inventory (name)
 */
const unAssignInventory = () => async(req,res)=>{
    try {
        const warehouseID = req.params.id
        const doc = await Warehouse.findByIdAndUpdate(
            { _id: warehouseID },
            {$unset:{inventory:""}}
        )
        if (!doc) {
            return res.status(404).end()
        }
        return res.status(200).json({
            message: 'Removed inventory from the selected warehouse!',
            data: doc
        })
    } catch (error) {
        console.error(error)
        res.status(400).end()
    }
}
const warehouseCRUD = {
    createWarehouse: createWarehouse(),
    readWarehouse: readWarehouse(),
    updateWarehouse: updateWarehouse(),
    deleteWarehouse: deleteWarehouse(),
    readOneWarehouse: readOneWarehouse(),
    assignInventory: assignInventory(),
    unAssignInventory: unAssignInventory()
}
module.exports.warehouseCRUD = warehouseCRUD