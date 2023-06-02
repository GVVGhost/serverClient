const UserModel = require('@/modules/catalogs/users/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const user = await UserModel.findOne({where: {email: req.body.email}})
        .catch(err => res.status(400).send({message: "Bad request"}));

    if (!user) {
        res.status(404).send({message: "User not found"});
        return;
    }

    const isEqual = await bcrypt.compare(req.body.password, user.password);
    if (!isEqual) {
        res.status(401).send({message: "unauthorized"});
        return;
    }

    const access_token = jwt.sign({id: user.id},
        process.env.PRIVATE_KEY_FOR_JWT,
        {expiresIn: '360h'}
    );
    // console.log('access_token:', access_token);

    res.status(200).send({access_token, user});
}