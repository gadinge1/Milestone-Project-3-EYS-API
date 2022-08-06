// DEPENDENCIES 
const products = require('express').Router()
const db = require('../models')
const { Product, SalesOrder } = db 
const { Op } = require('sequelize')

// FIND ALL PRODUCTS
products.get('/', async (req, res) => {
    try {
        const foundProducts = await Product.findAll({
            order: [ [ 'name', 'ASC' ] ], 
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundProducts)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A SPECIFIC PRODUCT
products.get('/:name', async (req, res) => {
    try {
        const foundProduct = await Product.findOne({
            where: { name: req.params.name },
            include: [
                { 
                    model: SalesOrder, 
                    as: "products", 
                    attributes: { exclude: ["cart_id"] },
                    // include: { 
                    //     model: Product, // need fixing
                    //     as: "products", 
                    //     where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } } 
                    // }
    
                }
            ],
            order: [
                [{ model: SalesOrder, as: "sales_orders" }, 'transaction_date', 'DESC'], // need fixing
            ]
        })
        res.status(200).json(foundProduct)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A PRODUCT
products.post('/', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new product',
            data: newProduct
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE A PRODUCT
products.put('/:id', async (req, res) => {
    try {
        const updatedProducts = await Product.update(req.body, {
            where: {
                product_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedProducts} product(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A PRODUCT
products.delete('/:id', async (req, res) => {
    try {
        const deletedProducts = await Product.destroy({
            where: {
                product_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedProducts} product(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = products