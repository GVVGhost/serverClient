const httpStatus = require('http-status-codes');
const CustomerModel = require('@/modules/catalogs/customers/models/index.js');

// const _ = require('lodash');
// const { Op } = require('sequelize');

module.exports = {

    async findAll(req, res, next) {
        const customers = await CustomerModel.findAll({
            where: (req.body) ? req.body : {}
        });
        res.status(200).send(customers);
    },

    async findById(req, res, next) {
        const existCustomer = await CustomerModel.findByPk(req.params.id);
        if (existCustomer) res.status(200).send(existCustomer);
        else res.status(400).send({message: 'Customer not found'});
    },

    async create(req, res, next) {
        if (!req.body) res.status(400).send({massage: 'Customers creation error'});
        else await CustomerModel.create(req.body)
            .then(async newItem => res.status(200).send({
                message: 'OK', newItem
            }))
            .catch((err) => {
                res.status(400).send({massage: 'Customers creation error'});
            });
    },

    async update(req, res, next) {
        const existCustomer = await CustomerModel.findByPk(req.params.id);
        if (!existCustomer) res.status(404).send({message: 'Customer not found'});
        const updateCustomer = await existCustomer
            .update({...req.body})
            .catch(err => res.status(400).send({message: 'bad request'}));
        res.status(200).send(updateCustomer);
    },

    async remove(req, res, next) {
        await CustomerModel.destroy({
            where: {id: req.params.id}
        }).catch(err => res.status(400).send({message: 'bad request'}));
        res.status(200).send({message: 'OK'})
    }
};