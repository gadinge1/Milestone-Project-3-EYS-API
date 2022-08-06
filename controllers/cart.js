// DEPENDENCIES 
const carts = require('express').Router()
const db = require('../models')
const { Cart, Product, SalesOrder } = db 
const { Op } = require('sequelize')

// FIND ALL CARTS
carts.get('/', async (req, res) => {
    try {
        const foundCarts = await Cart.findAll({
            order: [ [ 'name', 'ASC' ] ], 
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundCarts)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A SPECIFIC CART
carts.get('/:name', async (req, res) => {
    try {
        const foundCart = await Cart.findOne({
            where: { name: req.params.name },
            include: [
                { 
                    model: SalesOrder, 
                    as: "sales_orders", 
                    attributes: { exclude: ["cart_id"] },
                    include: { 
                        model: Product, 
                        as: "products", 
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } } 
                    }
    
                }
            ],
            order: [
                [{ model: SalesOrder, as: "sales_orders" }, { model: Product, as: "products" }, 'transaction_date', 'DESC'], // need fixing
            ]
        })
        res.status(200).json(foundCart)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A CART 
carts.post('/', async (req, res) => {
    try {
        const newCart = await Cart.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new cart',
            data: newCart
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE A CART 
carts.put('/:id', async (req, res) => {
    try {
        const updatedCarts = await Cart.update(req.body, {
            where: {
                cart_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedCarts} cart(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A CART 
carts.delete('/:id', async (req, res) => {
    try {
        const deletedCarts = await Cart.destroy({
            where: {
                cart_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedCarts} cart(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = carts