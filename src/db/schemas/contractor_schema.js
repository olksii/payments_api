const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('../index');

const Contractor = sequelize.define('Contractor', {
	id: {
		type: DataTypes.UUID,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	company_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	company_inn: {
		type: DataTypes.BIGINT,
		allowNull: false,
	},
	enabled: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
}, {
	freezeTableName: true,
	tableName: 'contractor',
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
});

module.exports = {Contractor};
