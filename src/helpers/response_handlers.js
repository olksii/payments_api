const fs = require('fs');
const path = require('path');

const d = Date(Date.now());
const a = d.toString();

const filePath = path.join(__dirname, 'log.txt');
fs.writeFile(filePath, 'hello' + '\n', (err, data) => {
	if (err) {
		return console.log(err);
	}

	console.log(data);
});

function errorHandler(err) {
	console.log('Error is', err);
	err = JSON.stringify(err);
	fs.appendFile(filePath, a + '\t' + err + '\n', (err, data) => {
		if (err) {
			return console.log('Errrorrrr', err);
		}
	});
}

const responseHandlers = {

	errorHandler(res, err) {
		console.log('Thisd', err);
		const d = Date(Date.now());
		const a = d.toString();

		const filePath = path.join(__dirname, 'log.txt');
		fs.writeFile(filePath, 'hello' + '\n', (err, data) => {
			if (err) {
				return console.log(err);
			}

			console.log(data);
		});
		// Console.log('Error is', err)
		// err = JSON.stringify(err)
		fs.appendFile(filePath, a + '\t' + err + '\n', (err, data) => {
			if (err) {
				return console.log('Errrorrrr', err);
			}
		});

		if (typeof (err.errors) === 'string') {
			res.writeHead(400, {'Content-Type': 'text/html'});
			res.end(err.errors);
		} else {
			res.writeHead(400, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(err.errors));
		}
	},

	successHandler(res, success_msg = 'Success') {
		if (typeof (success_msg) === 'string') {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(success_msg);
		} else {
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(success_msg));
		}
	},

};

module.exports = {responseHandlers};
