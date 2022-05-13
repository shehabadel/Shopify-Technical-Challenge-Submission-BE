const Item = require('./items.model').Item

const createItem = ()=> async(req,res)=>{
    try {
        const doc = await Item.create({...req.body})
        res.status(201).json({data:doc})
    } catch (error) {
        console.error(e)
        res.status(400).end()
    }
}
const readItem = () => async(req,res)=>{
    try {
        const doc = await Item.find({})
        if(!doc){
            return res.status(404).end()
        }
        res.status(200).json({data:doc})
    } catch (error) {
        console.error(e)
        res.status(400).end()
    }
}

const readOneItem = () => async(req,res)=>{
    try {
        const id = req.params.id
        const doc = await Item.findOne({_id:id})
        if(!doc){
            return res.status(404).end()
        }
        res.status(200).json({data:doc})
    } catch (error) {
        console.error(e)
        res.status(400).end()
    }
}
const updateItem = () => async(req,res)=>{
    try {
        const doc = await Item.findOneAndUpdate(
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

const deleteItem = () => async(req,res)=>{
    try {
        const id= req.params.id
        const doc = await Item.findByIdAndRemove({_id:id})
        if(!doc){
            return res.status(404).end()
        }
        res.status(200).json({
            message:`Successfully deleted the item of ID ${id}`,
            data: doc
        })
    } catch (error) {
        console.error(e)
        res.status(400).end()
    }
}

const itemCRUD = {
    createItem: createItem(),
    readItem: readItem(),
    updateItem: updateItem(),
    deleteItem: deleteItem(),
    readOneItem: readOneItem()
}
module.exports.itemCRUD = itemCRUD