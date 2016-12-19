const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
	email: {
		type: String, // Only accepts String
		require: true, // Requires this field
		trim: true, // Trim white space from before and after the email
		minlength: 1, // Min Length of 1 character long
		unique: true, // No duplicate email
		validate: { // Validate option within Mongoose
			// validator npm package to validate tons of things
			validator: validator.isEmail,
			message: '{VALUE} is not valid' // Return message built into Validate option within Mongoose
		}
	},
	password: {
		type: String,
		require: true,
		minlength: 6
	},
	tokens: [{ // Secure way for users to access there data
		access: {
			type: String,
			require: true
		},
		token: {
			type: String,
			require: true
		}
	}]
});

UserSchema.methods.toJSON = function() {
	let user = this;
	let userObject = user.toObject();
	return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
	let user = this;
	let access = 'auth';
	let token = jwt.sign({ _id: user._id.toHexString(), access }, '123abc')
		.toString();

	user.tokens.push({ access, token })

	return user.save()
		.then(() => {
			return token;
		})
};

let User = mongoose.model('User', UserSchema);

module.exports = { User };
