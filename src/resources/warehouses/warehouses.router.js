const warehouseCRUD= require('./warehouses.controller').warehouseCRUD
const Router = require('express').Router

const router = Router()

// /api/v1/items
router
    .route('/')
    .post(warehouseCRUD.createWarehouse)
    .get(warehouseCRUD.readWarehouse)


// /api/v1/items/:id
router
    .route('/:id')
    .put(warehouseCRUD.updateWarehouse)
    .delete(warehouseCRUD.deleteWarehouse)
    .get(warehouseCRUD.readOneWarehouse)

module.exports.warehousesRouter=router