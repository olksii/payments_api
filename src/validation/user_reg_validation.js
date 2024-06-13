
const Schema = require('validate');

const textString = val => /^[a-zA-Z0-9А-Яа-я]+$/.test(val);
const emailString = val => /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val);

const user = new Schema({
	name: {
		required: true,
		length: {min: 3, max: 32},
		use: {textString},
	},
	email: {
		required: true,
		use: {emailString},
	},
	password: {
		required: true,
	},
	role_id: {
		required: true,
	},

});

user.message({
	textString: path => `${path} must be only letters`,
});

user.message({
	emailString: path => `${path} wrong format`,
});

user.message({
	required: path => `${path} is required!`,
});

module.exports = {user};
