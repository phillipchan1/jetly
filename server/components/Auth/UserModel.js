const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	providerId: {
		type: String,
		required: true
	},
	provider: String,
	name: {
		type: String
	}
});

var User = mongoose.model('User', userSchema);

module.exports = User;
