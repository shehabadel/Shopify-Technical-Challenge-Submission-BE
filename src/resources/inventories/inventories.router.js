const inventoryCRUD = require('./inventories.controller').inventoryCRUD
const Router = require('express').Router

const router = Router()

// /api/v1/inventories
router
    .route('/')
    .post(inventoryCRUD.createInventory)
    .get(inventoryCRUD.readInventory)


// /api/v1/inventories/:id
router
    .route('/:id')
    .put(inventoryCRUD.updateInventory)
    .delete(inventoryCRUD.deleteInventory)
    .get(inventoryCRUD.readOneInventory)

module.exports.inventoriesRouter=router