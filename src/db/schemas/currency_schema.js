const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('../index');

const Currency = sequelize.define('Currency', {
	id: {
		type: DataTypes.UUID,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	sign: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	enabled: {
		type: DataTypes.BOOLEAN,
		allowNull: true,
		defaultValue: true,
	},
}, {
	freezeTableName: true,
	tableName: 'currency',
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
});

module.exports = {Currency};
