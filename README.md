# Shopify-Technical-Challenge-Submission-BE
Shopify Technical Challenge Submission Backend Internship Fall 2022

# How to Run

Make sure you have `Node.js` environment on your device

1. Clone/Fork the project, and open a terminal in the project's directory.
2. run `npm install` to install packages used
3. create a `.env` file in the project root directory (in the same directory as `package.json`
4. create a variable called `DB_URL` and add your MongoDB URI to it (or keep it `'mongodb://localhost:27017'`)
5. run `npm run start`

# Project Description

The API consists of three models

1. Warehouses
2. Inventories
3. Items

A `Warehouse` has one `Inventory` assigned to it.

An `Inventory` has several `Item`s assigned to it.

Each model has CRUD endpoints, and other request handlers.

# Project Structure

Inside `src` directory

1. config

    1. `db.js` contains `_connect` function that connects to the MongoDB

2. resources
    
    1. Contains routers, models, and controllers.
    
        1. `*.router.js` -> creates a router object that routes a route to a specific request handler
        2. `*.model.js` -> contains the entity's mongoose schema
        3. `*.controller.js` -> contains CRUD request handlers, and other request handlers as well. 
