// Database Schema:
// [] registered users/ guest
// name
// email
// shipping and billing address
// payment info
// registered status
// over 21?
// password

const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    payment: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isCreditCard: true
        }
    },
    registered: {
        type: Sequelize.BOOLEAN
    },
    age: {
        type: Sequelize.INTEGER,
        validate: {
            min: 21
        }
    },
    password: {
        type: Sequelize.STRING,
    },
    defaultScope: {
        attributes: {
            exclude: ["password"]
          }
        }
});