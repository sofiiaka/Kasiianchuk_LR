const sequelize = require("../DB/database");
const {DataTypes} = require("sequelize");

// Models list
const office = sequelize.define('office', {
        name: {type: DataTypes.STRING, allowNull: false},
        description: {type: DataTypes.STRING},
    },
    {timestamps: false});

const fabrication = sequelize.define('fabrication', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        officeID: {
            type: DataTypes.INTEGER,
            references: {
                model: office,
                key: 'id',
            },
        },
        office_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        Repaired: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        month: {type: DataTypes.STRING, allowNull: false},

    },
    {timestamps: false});

const products_list = sequelize.define('products_list', {
        name: {type: DataTypes.STRING, allowNull: false},
    },
    {timestamps: false});

const resource = sequelize.define('resource', {
        name: {type: DataTypes.STRING, allowNull: false},
        tariff: {type: DataTypes.DOUBLE, allowNull: false},

    },
    {timestamps: false});

const costs = sequelize.define('costs', {
        Month: {type: DataTypes.STRING, allowNull: false},
        resource_id: {type: DataTypes.INTEGER, allowNull: false},
        resource_name: {type: DataTypes.STRING, allowNull: false},
        office_id: {type: DataTypes.INTEGER, allowNull: false},
        office_name: {type: DataTypes.STRING},
        Consumed: {type: DataTypes.FLOAT, allowNull: false},
        Total_cost: {type: DataTypes.DECIMAL(10, 2), allowNull: false},

    },
    {timestamps: false});


module.exports = {fabrication, office, products_list, resource, costs}