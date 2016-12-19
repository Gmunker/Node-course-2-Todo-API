let { User } = require('./../models/user')

let authenticate = (req, res, next) => {
	let token = req.header('x-auth');

	User.findByToken(token)
		.then((user) => {
			if (!user) {
				return Promise.reject(); // Will force the function to fail, shooting it down to the .catch below.
			};

			req.user = user;
			req.token = token
			next();
		})
		.catch(() => {
			res.status(401)
				.send();
		});
};

module.exports = { authenticate };
