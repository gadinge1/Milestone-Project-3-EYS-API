// DEPENDENCIES 
const accounts = require('express').Router()
const db = require('../models')
const { Account, SalesOrder } = db 
const { Op } = require('sequelize')

// FIND ALL ACCOUNTS
accounts.get('/', async (req, res) => {
    try {
        const foundAccounts = await Account.findAll({
            order: [ [ 'name', 'ASC' ] ], 
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundAccounts)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A SPECIFIC ACCOUNT
accounts.get('/:id', async (req, res) => {
    try {
        const foundAccount = await Account.findOne({
            where: { name: req.params.id },
            include: [
                { 
                    model: SalesOrder, 
                    as: "sales_orders", 
                    attributes: { exclude: ["account_id"] },
                    // include: { 
                    //     model: Product, // need fixing
                    //     as: "products", 
                    //     where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } } 
                    // }
    
                }
            ],
            order: [
                [{ model: SalesOrder, as: "sales_orders" } , 'transaction_date', 'DESC'], // need fixing
            ]
        })
        console.log(foundAccount)
        res.status(200).json(foundAccount)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND ALL ACCOUNTS FOR SPECIFIC SALES ORDER
accounts.get('/sales_order/:sales_orderId', async (req,res) => {
    try {
        const foundspecificSales_order = await SalesOrder.findAll({
            where: { accountId: req.params.sales_orderId }
        })
        res.status(200).json(foundspecificSales_order)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE AN ACCOUNT OR USER
accounts.post('/', async (req, res) => {
    try {
        const newAccount = await Account.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new account',
            data: newAccount
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE AN ACCOUNT OR USER
accounts.put('/:id', async (req, res) => {
    try {
        const updatedAccounts = await Account.update(req.body, {
            where: {
                user_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedAccounts} account(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE AN ACCOUNT OR USER
accounts.delete('/:id', async (req, res) => {
    try {
        const deletedAccounts = await Account.destroy({
            where: {
                user_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedAccounts} account(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = accounts