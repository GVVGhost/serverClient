const UserModel = require('@/modules/catalogs/users/models/index.js');
const bcrypt = require('bcrypt');

module.exports = {

    async findAll(req, res, next) {
        const users = await UserModel.findAll({where: (req.body) ? req.body : {}});
        res.status(200).send(users);
    },

    async findById(req, res, next) {
        console.log("req", req.params.id);
        const existUser = await UserModel.findByPk(req.params.id);
        console.log("existUser", existUser);

        if (existUser) res.status(200).send(existUser);
        else res.status(400).send({message: 'user not found'});
    },

    async create(req, res, next) {
        const data = {...req.body};
        data.password = await bcrypt.hash(data.password, 12);
        const user = await UserModel.create(data).catch(err => {
            res.status(400).send('User is not created');
        });
        res.status(200).send(user);
    },

    async update(req, res, next) {
        const existUser = await UserModel.findByPk(req.params.id);
        if (!existUser) res.status(404).send({message: 'User not found'});
        const updateUser = await existUser.update({...req.body})
            .catch(err => res.status(400).send({message: 'bed request'}));
        res.status(200).send(updateUser);
    },

    async remove(req, res, next) {
        await UserModel.destroy({where: {id: req.params.id}})
            .catch(err => res.status(400).send({message: 'bad request'}));
        res.status(200).send({message: 'OK'})
    },

    async profile(req, res, next) {
        res.status(200).send(req.profile);
    },
}