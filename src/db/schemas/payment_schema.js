const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('../index');

const Payment = sequelize.define('Payment', {
	id: {
		type: DataTypes.UUID,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	subject: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	number: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	data: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	arrangment_number: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	whole_sum: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	sum_to_pay: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	sum_left: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	expiration_date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	payed_date: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	file_link: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	comment: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	response_status: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	trip_route: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	trip_number: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	is_added_to_crm: {
		type: DataTypes.BOOLEAN,
		allowNull: true,
	},
	enabled: {
		type: DataTypes.BOOLEAN,
		defaultValue: true,
		allowNull: true,
	},

}, {
	freezeTableName: true,
	tableName: 'payment',
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
});

module.exports = {Payment};
