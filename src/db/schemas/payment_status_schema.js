const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('../index');

const PaymentStatus = sequelize.define('payment_status', {
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
		allowNull: false,
		defaultValue: true,
	},
}, {
	freezeTableName: true,
	tableName: 'payment_status',
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
});

module.exports = {PaymentStatus};
