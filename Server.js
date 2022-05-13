const express = require('express');
const morgan = require('morgan');
const cors  = require('cors');
const json = require('body-parser/lib/types/json');
const urlencoded = require('body-parser/lib/types/urlencoded');
const createError = require('http-errors');
const connect = require("./src/config/db").connect;
const inventoriesRouter = require('./src/resources/inventories/inventories.router').inventoriesRouter
const itemsRouter = require('./src/resources/items/items.router').itemsRouter


class Server{
    /**
     * Server class constructor which will be called in `index.js`
     * Initializes the express app, port number to listen on,
     * middlewares, routes, and error handling methods.
     */
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.paths={
            inventories:"/api/v1/inventories",
            itemsRouter:"/api/v1/items"
        };
        this.middlewares();
        this.routes();
        this.errorHandling();
    }
    middlewares(){
        //Enable CORS
        this.app.use(cors());

        this.app.use(json());
        this.app.use(urlencoded({extended:true}));

        //Logging
        this.app.use(morgan('dev'));
    }
    errorHandling(){
        this.app.use(async(req,res,next)=>{
            next(createError.NotFound());
        })
        this.app.use((err,req,res,next)=>{
            res.status(err.status || 500)
            res.send({
                error:{
                    status: err.status || 500,
                    message: err.message
                }
            })
        })
    }

    routes(){
        this.app.use(this.paths.inventories,inventoriesRouter);
        this.app.use(this.paths.itemsRouter,itemsRouter);
    }

    start(){
        //Conenct to the database using Mongoose
        connect()
        this.app.listen(this.port, ()=>{
            console.log("Shopify Technical Chanllenge Inventories app runs on ",this.port);
        })
    }
}

module.exports.Server = Server