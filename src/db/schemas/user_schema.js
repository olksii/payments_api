const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('../index');

const UserOffice = sequelize.define('UserOffice', {
	id: {
		type: DataTypes.UUID,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	secondName: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	companies: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	disabled: {
		type: DataTypes.BOOLEAN,
		allowNull: true,
		defaultValue: false,
	},
}, {
	freezeTableName: true,
	tableName: 'useroffice',
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
});

// Sequelize.sync({alter:true})
// .then(()=>{
//     console.log('Okkkk222')
// })
// .catch(e => {
//     console.log("Errorr", e)
// })

module.exports = {UserOffice};
