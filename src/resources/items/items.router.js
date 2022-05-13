const itemCrud = require('./items.controller').itemCRUD
const Router = require('express').Router

const router = Router()

// /api/v1/items
router
    .route('/')
    .post(itemCrud.createItem)
    .get(itemCrud.readItem)


// /api/v1/items/:id
router
    .route('/:id')
    .put(itemCrud.updateItem)
    .delete(itemCrud.deleteItem)
    .get(itemCrud.readOneItem)

module.exports.itemsRouter=router