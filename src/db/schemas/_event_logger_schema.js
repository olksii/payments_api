const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('../index');

const EventLogger = sequelize.define('Logs', {
	id: {
		type: DataTypes.UUID,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	event_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
}, {
	freezeTableName: true,
	tableName: 'logs',
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: false,
});

module.exports = {EventLogger};
