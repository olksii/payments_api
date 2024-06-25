const {Payment} = require('../db/schemas/payment_schema.js');
const fs = require('fs');

const {UserOffice} = require('../db/schemas/user_schema.js');
const {Company} = require('../db/schemas/company_schema.js');
const {Contractor} = require('../db/schemas/contractor_schema.js');
const {RepresentativeContractor} = require('../db/schemas/representative_contractor_schema.js');
const {PaymentStatus} = require('../db/schemas/payment_status_schema.js');
const {DocumentStatus} = require('../db/schemas/document_status_schema.js');
const {PaymentType} = require('../db/schemas/payment_type_schema.js');
const {Currency} = require('../db/schemas/currency_schema.js');


const link = 'C:/Users/derek/Desktop/Unison Payments/payment_files/';
//payment_initiator:[{id:'919426e6-5a64-4f61-8f7e-5a4a672847d7'}]
const paymentModel = {
	
	async getPayments(list) {
		console.log('List', list)
		const {sortField, sortOrder, filter, currentPage, limitItems} = list;
		const emptyObj = ''
		try {
			return await Payment.findAll({
				where: {enabled: true, },
				include: [
					{model: UserOffice, as: 'paymentInitiator', where:{emptyObj}},
					{model: Company, as:'companyPayer', where:{emptyObj}},
					{model: PaymentStatus, as: 'paymentStatus', where:{emptyObj}},
					{model: DocumentStatus, as: 'documentStatus', where:{}},
					{model: Currency, as: 'currency', where:{}},
					{model: PaymentType, as: 'paymentType', where:{}},
					{
						model: Contractor, as: 'contractor', where:{},
						include: [
							{model: RepresentativeContractor, as: 'representativeContractor',where:{}},
						],
					},
				],
				order: [[sortField, sortOrder]],
				offset:((currentPage-1)*limitItems),
				limit:limitItems,
			});
		} catch (error) {
			console.log('err', error);
			return error;
		}
	},

	async getPaymentById(id) {
		try {
			return await Payment.findAll({
				where: {enabled: true, id:id},
				include: [
					{model: UserOffice, as: 'payment_initiator'},
					{model: Company},
					{model: PaymentStatus, as: 'payment_status'},
					{model: DocumentStatus, as: 'document_status'},
					{model: Currency, as: 'currency'},
					{model: PaymentType, as: 'payment_type'},
					{
						model: Contractor, as: 'contractor',
						include: [
							{model: RepresentativeContractor, as: 'representative_contractor'},
						],
					},
				],
				order: [[sortField, sortOrder]],
			});
		} catch (error) {
			console.log('err', error);
			return error;
		}
	},

	async getPaymentsByUserId(list) {
		console.log('list2', list)
		const {sortField, sortOrder, filter, id, currentPage, limitItems} = list;

		try {
			return await Payment.findAll({
				where: {enabled: true, payment_initiator_id:id, },
				include: [
					{model: UserOffice, as: 'payment_initiator'},
					{model: Company},
					{model: PaymentStatus, as: 'payment_status'},
					{model: DocumentStatus, as: 'document_status'},
					{model: Currency, as: 'currency'},
					{model: PaymentType, as: 'payment_type'},
					{
						model: Contractor, as: 'contractor',
						include: [
							{model: RepresentativeContractor, as: 'representative_contractor'},
						],
					},
				],
				order: [[sortField, sortOrder]],
				offset:((currentPage-1)*limitItems),
				limit:limitItems
			});
		} catch (error) {
			console.log('err', error);
			return error;
		}
	},

	async createPayment(requestData, filename) {
		try {
			const newPayment = await Payment.create({
				subject: requestData.subject,
				number: requestData.number,
				data: requestData.data,
				arrangment_number: requestData.arrangment_number,
				whole_sum: requestData.whole_sum,
				sum_to_pay: requestData.sum_to_pay,
				sum_left: requestData.sum_left,
				expiration_date: requestData.expiration_date,
				file_link: filename,
				comment: requestData.comment,
				trip_route: requestData.trip_route,
				trip_number: requestData.trip_number,
				is_added_to_crm: requestData.is_added_to_crm,
				payer_company_id: requestData.payer_company_id,
				currency_id: requestData.currency_id,
				payment_initiator_id: requestData.current_user_id,
				status_id: requestData.status_id,
				payment_type_id: requestData.payment_type_id,
				contractor_id: requestData.contractor_id,
				document_status_id: requestData.document_status_id,
			});
			console.log('NOEror1', newPayment);
			return newPayment;
		} catch (error) {
			console.log('Eror1', error);
			throw new Error (`Error-model:${error}`);
		}
	},
	async createPaymentContractor() {

	},
	async createPaymentContractorRepresentativeContractor(requestData, filename) {
		console.log('This is requestdata2', requestData);
		try {
			const newPayment = await Payment.create({
				subject: requestData.subject,
				number: requestData.number,
				data: requestData.paymentData,
				arrangment_number: requestData.arrangment_number,
				whole_sum: requestData.whole_sum,
				sum_to_pay: requestData.sum_to_pay,
				sum_left: requestData.sum_left,
				expiration_date: requestData.expiration_date,
				file_link: filename,
				comment: requestData.comment,
				trip_route: requestData.trip_route,
				trip_number: requestData.trip_number,
				is_added_to_crm: requestData.is_added_to_crm,
				payer_company_id: requestData.payer_company_id,
				currency_id: requestData.currency_id,
				payment_initiator_id: requestData.payment_initiator_id,
				status_id: requestData.status_id,
				payment_type_id: requestData.payment_type_id,
				document_status_id: requestData.document_status_id,
				contractor: {
					company_name: requestData.company_name,
					company_inn: requestData.company_inn,
					representative_contractor: {
						name: requestData.name,
						phone: requestData.phone,
						email: requestData.email,
						position: requestData.position,
					},
				},
			},
			{
				include: [{model: Contractor, as: 'contractor', include: [{model: RepresentativeContractor, as: 'representative_contractor'}]}],
			},
			);
			return (newPayment);
		} catch (error) {
			console.log('Eror2', error);
			throw new Error (`Error-model:${error}`);
		}
	},

	async deletePayment(id) {
		let deletedPayment;
		try {
			deletedPayment = await Payment.findAll({where: {id}});
			console.log('payemnt is', deletedPayment[0].file_link);
			if (deletedPayment[0].file_link !== 'no_file') {
				const file = link + deletedPayment[0].file_link;
				console.log('File', file);
				fs.unlinkSync(file);
			}

			deletedPayment = await Payment.destroy({where: {id}});
			return deletedPayment;
		} catch (error) {
			return error;
		}
	},

	async editPaymentStatus(id, dataObj) {
		try {
			const editedPaymentStatus = await Payment.update({status_id: dataObj.payment_status_id}, {where: {id}});
			console.log('Edited model', editedPaymentStatus)
			return editedPaymentStatus;
		} catch (error) {
			return error;
		}
	},

};

module.exports = {paymentModel};

