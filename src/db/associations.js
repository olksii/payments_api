const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('./index');

const {Payment} = require('./schemas/payment_schema.js');
const {UserOffice} = require('./schemas/user_schema.js');
const {Company} = require('./schemas/company_schema.js');
const {Role} = require('./schemas/role_schema.js');
const {Permission} = require('./schemas/permission_schema.js');

const {Contractor} = require('./schemas/contractor_schema.js');
const {Currency} = require('./schemas/currency_schema.js');
const {PaymentStatus} = require('./schemas/payment_status_schema.js');
const {RepresentativeContractor} = require('./schemas/representative_contractor_schema.js');
const {PaymentType} = require('./schemas/payment_type_schema.js');
const {DocumentStatus} = require('./schemas/document_status_schema.js');

// One-to-Many========================================================

// Payment belongs to one user(creator), User has many payments;
UserOffice.hasMany(Payment, {foreignKey: {name: 'payment_initiator_id', allowNull: false}, as: 'payment_initiator'});
Payment.belongsTo(UserOffice, {foreignKey: {name: 'payment_initiator_id', allowNull: false}, as: 'payment_initiator'});

// Payment belongs to one user(someone who approved payment), User has many payments;
UserOffice.hasMany(Payment, {foreignKey: {name: 'approved_by_id', allowNull: true}, as: 'payment_approval'});
Payment.belongsTo(UserOffice, {foreignKey: {name: 'approved_by_id', allowNull: true}, as: 'payment_approval'});

// UserOffice.hasMany(Payment,{targetKey:'id', foreignKey:{name:'approved_by_id', allowNull:true}});
// Payment.belongsTo(UserOffice, {targetKey:'id', foreignKey:{name:'approved_by_id', allowNull:true}});

// User belongs to one role, Role has many users;
Role.hasMany(UserOffice, {foreignKey: 'role_id', allowNull: false});
UserOffice.belongsTo(Role, {foreignKey: 'role_id', allowNull: false});

// Payment belongs to one company. Company has many payments;
Payment.belongsTo(Company, {foreignKey: {name: 'payer_company_id', allowNull: false}});
Company.hasMany(Payment, {foreignKey: {name: 'payer_company_id', allowNull: false}});

// Payment belongs to one currency. Currency has many payments;
Payment.belongsTo(Currency, {foreignKey: {name: 'currency_id', allowNull: false}, as: 'currency'});
Currency.hasMany(Payment, {foreignKey: {name: 'currency_id', allowNull: false}, as: 'currency'});

// Payment belongs to one PaymentStatus, PaymentStatus has many Payments;
Payment.belongsTo(PaymentStatus, {foreignKey: {name: 'status_id', allowNull: false}, as: 'payment_status'});
PaymentStatus.hasMany(Payment, {foreignKey: {name: 'status_id', allowNull: false}, as: 'payment_status'});

Payment.belongsTo(PaymentType, {foreignKey: {name: 'payment_type_id', allowNull: false}, as: 'payment_type'});
PaymentType.hasMany(Payment, {foreignKey: {name: 'payment_type_id', allowNull: false}, as: 'payment'});

// Payment belongs to one Contractor, Contractor has many Payments;
Payment.belongsTo(Contractor, {foreignKey: {name: 'contractor_id', allowNull: false}, as: 'contractor'});
Contractor.hasMany(Payment, {foreignKey: {name: 'contractor_id', allowNull: false}, as: 'payment'});

Payment.belongsTo(DocumentStatus, {foreignKey: {name: 'document_status_id', allowNull: true}, as: 'document_status'});
DocumentStatus.hasMany(Payment, {foreignKey: {name: 'document_status_id', allowNull: true}, as: 'document_status'});
// Payment.belongsTo(Contractor, {foreignKey:{name:'contractor_id', allowNull:false}, as:'contractor'});
// Contractor.hasMany(Payment, {foreignKey:{name:'contractor_id', allowNull:false}, as:'payment'});

// Contractor.belongsTo(Payment, {foreignKey:{name:'contractor_id', allowNull:false}, as:'contractor'})

Contractor.belongsTo(RepresentativeContractor, {foreignKey: {name: 'representative_contractor_id', allowNull: false}, as: 'representative_contractor'});
RepresentativeContractor.hasMany(Contractor, {foreignKey: {name: 'representative_contractor_id', allowNull: false}, as: 'representative_contractor'});

// Many-to-Many================================================================================================================================================================
const UserOfficeCompany = sequelize.define('UserOfficeCompany', {}, {
	timestamps: true, tableName: 'useroffice_company', createdAt: 'created_at', updatedAt: 'updated_at',
});
const RoleToPermission = sequelize.define('RoleToPermission', {}, {
	timestamps: true, tableName: 'role_to_permission', createdAt: 'created_at', updatedAt: 'updated_at',
});

UserOffice.belongsToMany(Company, {through: UserOfficeCompany});
Company.belongsToMany(UserOffice, {through: UserOfficeCompany});

Role.belongsToMany(Permission, {through: RoleToPermission});
Permission.belongsToMany(Role, {through: RoleToPermission});

// Каждый раз использовать?

// This checks what is the current state of the table in the database (which columns it has, what are their data types, etc),
// and then performs the necessary changes in the table to make it match the model.

// sequelize.sync({alter:true}).then(() => {
//     console.log('Таблицы готовы')
// });

// This creates the table, dropping it first if it already existed

// Payment.sync({force:true}).then(() => {
//     console.log('Таблицы готовы')
// });

const addRecordToDb = async () => {
	try {
		const UserOffice1 = await UserOffice.create({username: 'Вячеслав', email:'v.franchuk@unison.org.ua', password:'TyuKjh485', role_id:'5cecef3e-0f52-430f-9381-1b36287494db'});
		console.log('UserOffice1', UserOffice1);
	} catch (error) {
		console.log('error is ', error);
	}
};

// Const addRecordToDb2 = async() => {
//     try {
//         const createStatus = await PaymentStatus.create({name:'Не оплачен', description:'Статус ново-созданного платежа' });
//         console.log('createCurrency', createStatus);
//     } catch (error) {
//         console.log('error is ', error)
//     }
// }
// addRecordToDb()

// addRecordToDb2()

const addRecordToDb3 = async () => {
	// Payment.Contractor = Payment.belongsTo(Contractor);
	// RepresentativeContractor.Contractor = RepresentativeContractor.hasMany(Contractor);
	const filename = 'asass';
	try {
		const newPayment = await Payment.create({
			subject: 'Перевозки1',
			number: '123124',
			data: '2024-03-16 22:46:41.711 +00:00',
			arrangment_number: 'xx231',
			whole_sum: '10000',
			sum_to_pay: '10000',
			sum_left: '0',
			expiration_date: '2024-03-16 22:46:41.711 +00:00',
			file_link: 'filename',
			comment: 'тУТ БЫЛ СТАС',
			trip_route: 'Житомир - Киев',
			trip_number: '1231241414',
			payer_company_id: 'ee0589d9-96c4-43b9-bcc5-1e21c9b259a7',
			currency_id: '4266b3cd-430d-4b1a-80db-095f11bc594d',
			payment_initiator_id: '46798d4d-57ff-4f6c-9479-c4413a20a731',
			status_id: '7fbd8e91-83db-4a5d-bd23-3c387d40bc17',
			document_status_id: 'dc6b55f9-fd5c-4a95-a62a-c84072bab2d3',
			payment_type_id: 'c96b50f1-96d1-4623-ac3a-e750b6803c11',
			is_added_to_crm: false,
			contractor: {
				company_name: 'ТОВ НЕ СТАС1',
				company_inn: '124124145',
				representative_contractor: {
					name: 'IVan1',
					phone: '+38060756343',
					email: 'hhggf@nail.com',
					position: 'worker',
				},
			},

		},
		{
			include: [{model: Contractor, as: 'contractor', include: [{model: RepresentativeContractor, as: 'representative_contractor'}]}],
		},
		);
		console.log('New Paymnnt', newPayment);
	} catch (error) {
		console.log('Error3', error);
	}
};

// AddRecordToDb3();
// module.exports = {UserOfficeCompany};

