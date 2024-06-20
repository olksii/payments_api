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
				console.log('Token is', token)
				if (!token) {
					return res.status(403).json({message: 'User1 is not authorized'});
				}
				const decoded = jwt.verify(token, process.env.SECRET_KEY);
				req.user = decoded;
				switch (decoded.roleId) {
					case '0c881288-0ac5-4b62-acce-e1051d69eaa2':
						req.user.role = 'admin'
						break;
					case '813a816d-5f44-4f60-8685-4269de85bdaa':
						req.user.role ='boss'
						break;
					case '6cb61682-c110-4d1b-b8fa-d9c5edcb6f4a':
						req.user.role ='accountant'
						break;
					default:
						req.user.role='user';
						break;
				}

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
	verifyRole (){
		return(req, res, next) => {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		console.log('Deco', decoded)
		switch (decoded.roleId) {
			case '0c881288-0ac5-4b62-acce-e1051d69eaa2':
				req.user.role = 'admin'
				break;
			case '813a816d-5f44-4f60-8685-4269de85bdaa':
				req.user.role ='boss'
				break;
			case '6cb61682-c110-4d1b-b8fa-d9c5edcb6f4a':
				req.user.role ='accountant'
				break;
			default:
				req.user.role='user';
				break;
		}
		next()
		}
	},
	paginateRequest() {
		return(req, res, next) => {

			const userData = req.user;
			const paginationData = req.body.pageable;

			const id = userData.id;

			const sortField = paginationData.sort.sortField || 'created_at';
			const sortOrder = (paginationData.sort.sortOrder || 'DESC').toUpperCase();

			
			const currentPage = paginationData.currentPage || 1;
			const limitItems = paginationData.limit || 5;
			const rangeFilter = paginationData.rangeFilter || null;
			const searchFilter = paginationData.search || null;


			const list = {};

			const filter = {};
	
			if(paginationData.filter){
				Object.keys(paginationData.filter).forEach((name) =>{
					if(name !== 'sort' && name !== 'order' && name !=='page' && name !=='limit'){
						filter[name]=paginationData.filter[name]
					}
				})
			}
			


			list.sortField = sortField;
			list.sortOrder = sortOrder;
			list.currentPage = currentPage;
			list.limitItems = limitItems;
			list.filter = filter;
			list.rangeFilter = rangeFilter;
			list.userId = id;
			list.searchFilter = searchFilter;

			req.list = list;

			next()
		}
		
		
		
	}

};

module.exports = {middleware};
