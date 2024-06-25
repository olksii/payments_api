const { PaymentStatus } = require("../db/schemas/payment_status_schema");

const paymentAllTables = {
    paymentInitator: 'paymentInitiator',
    companyPayer: 'companyPayer',
    PaymentStatus: 'paymentStatus',
    DocumentStatus: 'DocumentStatus',
    Currency: 'Currency',
    PaymentType: 'PaymentType',
    Contractor: 'Contractor',
    RepresentativeContractor:'RepresentativeContractor'
}