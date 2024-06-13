const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('../index');

const Company = sequelize.define('Company', {
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
	company_INN: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	company_comment: {
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
	tableName: 'company',
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
});

module.exports = {Company};
