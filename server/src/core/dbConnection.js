const Sequelize = require('sequelize');

const {db_name, db_user, db_password, db_dialect, db_host, db_port} = require('@/core/config');

const sequelize = new Sequelize(
    db_name,
    db_user,
    db_password, {
        dialect: db_dialect,
        host: db_host,
        port: db_port,
        logging: false,
        define: {
            hooks: {
                beforeCreate(model, options, fn) {
                    // console.log('model.constructor.name',model.constructor.name);
                    // console.log('options',options);
                    // const { details, transaction } = options;
                    // console.log('transaction', transaction);
                    // console.log('before create hook');
                },
                beforeFind(arg) {
                    // console.log('this', this);
                    // console.log('arg', arg);
                    // process.exit(1);
                    // console.log('info',info);
                    // console.log('options',options);
                    // console.log('before find hook');
                },
            },
        },
    });

module.exports = sequelize;