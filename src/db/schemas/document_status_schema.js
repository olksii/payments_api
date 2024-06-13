const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('../index');

const DocumentStatus = sequelize.define('DocumentStatus', {
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
		allowNull: true,
	},
	enabled: {
		type: DataTypes.BOOLEAN,
		allowNull: true,
		defaultValue: true,
	},
}, {
	freezeTableName: true,
	tableName: 'document_status',
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
});

module.exports = {DocumentStatus};
