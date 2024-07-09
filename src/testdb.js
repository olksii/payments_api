const {Payment} = require('./db/schemas/payment_schema.js');

const makeRequest = async () => {
	const sortField = 'created_at';
	const sortOrder = 'DESC';

	console.log('SortField', sortField);
	console.log('SortOrder', sortOrder);

	try {
		const getPayments = await Payment.findAll({
			order: [[sortField, sortOrder.toUpperCase()]], // Используем параметры для сортировки
		});
		console.log('Payments', getPayments);
	} catch (error) {
		console.log(error);
	}
};

