// DEPENDENCIES 
const sales_orders = require('express').Router()
const db = require('../models')
const { SalesOrder, Product, Account } = db 
const { Op } = require('sequelize')

// FIND ALL SALES ORDERS
sales_orders.get('/', async (req, res) => {
    try {
        const foundSales_orders = await SalesOrder.findAll({
            order: [ [ '', '' ] ], // need fixing
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundSales_orders)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A SPECIFIC SALE ORDER
sales_orders.get('/:id', async (req, res) => {
    try {
        const foundSales_order = await SalesOrder.findOne({
            where: { name: req.params.id },
            include: [
                { 
                    model: Account, 
                    as: "accounts", 
                    attributes: { exclude: ["account_id"] },
                    include: { 
                        model: SalesOrder, 
                        as: "sales_orders", 
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } } 
                    }
    
                }
            ],
            order: [
                [{ model: SalesOrder, as: "sales_orders" }, { model: Account, as: "accounts" }, 'transaction_date', 'DESC'], 
            ]
        })
        res.status(200).json(foundSales_order)
    } catch (error) {
        res.status(500).json(error)
    }
})
// FIND ALL SALES ORDER FOR SPECIFIC ACCOUNT/USER
sales_orders.get('/account/:accountId', async (req,res) => {
    try {
        const foundspecificSales_order = await SalesOrder.findAll({
            where: { accountId: req.params.accountId }
        })
        res.status(200).json(foundspecificSales_order)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A SALES ORDER
sales_orders.post('/', async (req, res) => {
    try {
        const newSales_order = await SalesOrder.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new sales order',
            data: newSales_order
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE SALES ORDER
sales_orders.put('/:id', async (req, res) => {
    try {
        const updatedSales_order = await SalesOrder.update(req.body, {
            where: {
                sales_order_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedSales_order} sales order(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE SALES ORDER
sales_orders.delete('/:id', async (req, res) => {
    try {
        const deletedSales_order = await SalesOrder.destroy({
            where: {
                sales_order_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedSales_order} sales order(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = sales_orders