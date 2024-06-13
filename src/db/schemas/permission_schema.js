const {DataTypes, Sequelize} = require('sequelize');
const {sequelize} = require('../index.js');

const Permission = sequelize.define('permission', {
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
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	enabled: {
		type: DataTypes.BOOLEAN,
		defaultValue: true,
		allowNull: false,
	},
}, {
	freezeTableName: true,
	tableName: 'permission',
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
});

module.exports = {Permission};
