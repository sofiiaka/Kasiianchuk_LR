const sequelize = require('../DB/database');
const {office, resource, fabrication, products_list, costs} = require('./models')

resource.hasMany(costs,      { foreignKey: 'ID_resource' });
costs.belongsTo(resource,    { foreignKey: 'ID_resource' });

office.hasMany(costs,        { foreignKey: 'ID_offices' });
costs.belongsTo(office,      { foreignKey: 'ID_offices' });

office.hasMany(fabrication,  { foreignKey: 'ID_offices' });
fabrication.belongsTo(office,{ foreignKey: 'ID_offices' });

module.exports = { sequelize, office, resource, costs, fabrication, products_list };
