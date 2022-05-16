const warehouseCRUD= require('./warehouses.controller').warehouseCRUD
const Router = require('express').Router

const router = Router()

// /api/v1/warehouses
router
    .route('/')
    .post(warehouseCRUD.createWarehouse)
    .get(warehouseCRUD.readWarehouse)


// /api/v1/warehouses/:id
router
    .route('/:id')
    .put(warehouseCRUD.updateWarehouse)
    .delete(warehouseCRUD.deleteWarehouse)
    .get(warehouseCRUD.readOneWarehouse)

//Endpoints for assigning and removing inventories from
//a warehouse, ':id' parameter stands for
//warehouse's id.

router
    .route('/inventories/:id')
    .put(warehouseCRUD.assignInventory)
    .delete(warehouseCRUD.unAssignInventory)
module.exports.warehousesRouter=router