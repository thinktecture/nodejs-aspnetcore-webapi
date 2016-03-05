'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('customer', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};

/**
 * @swagger
 * definitions:
 *  CustomerModel:
 *      required:
 *          - id
 *          - firstName
 *          - lastName
 *      properties:
 *          id:
 *              type: integer
 *              description: A unique identifier
 *          firstName:
 *              type: string
 *              description: The first name of the given customer
 *          lastName:
 *              type: string
 *              description: The last name of the given customer
 */
