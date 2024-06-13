const validate = require('uuid-validate');

require('dotenv').config();
const jwt = require('jsonwebtoken');

const middleware = {

	checkUrl(req, res, next) {
		if (req.url.length > 1) {
			console.log('Okey-deokey', req.url);
			const uuid = (req.url).substring(1, req.url.length);
			if (validate(uuid)) {
				console.log('Ok');
				next();
			} else if (req.method === 'POST') {
				console.log('Ok');
				next();
			} else {
				res.status(400).send('Wrong uuid!');
			}
		} else {
			next();
		}

	},

	checkToken(req, res, next) {
		if (req.headers.cookie && (req.headers.cookie).includes('token')) {
			try {
				const token = req.headers.cookie.split('=')[1];
				if (!token) {
					return res.status(403).json({message: 'User1 is not authorized'});
				}

				const decodedData = jwt.verify(token, process.env.SECRET_KEY);
				req.user = decodedData;
				next();
			} catch (error) {
				console.log('ERError is', error);
				return res.status(403).json({message: 'User2 is not authorized'});
			}
		} else {
			console.error('User is not authorized');
			return res.status(403).json({message: 'User3 is not authorized'});
		}
	},
	paginateRequest() {
		return(req, res, next) => {
			const {id} = req.params;
			const sortField = req.query.sort || 'created_at';
			const sortOrder = (req.query.order || 'DESC').toUpperCase();
			const page = req.query.page || 1;
			const limit = req.query.limit || 5;
			const list = {};
			const filter = {};
	
			if(req.query){
				Object.keys(req.query).forEach((name) =>{
					if(name !== 'sort' && name !== 'order' && name !=='page' && name !=='limit'){
						filter[name]=req.query[name]
					}
				})
			}
			list.sortField = sortField;
			list.sortOrder = sortOrder;
			list.page = page;
			list.limit = limit;
			list.filter = filter;
			list.id = id;
			req.list = list;
			

			next()
		}
		
		
		
	}

};

module.exports = {middleware};
