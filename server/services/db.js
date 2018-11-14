const mongoose = require('mongoose');
const config = require('../../config/config');
let dbURL;

if (process.env.NODE_ENV === 'dev') {
	dbURL = `mongodb://${config.host}/${config.db_name}`;
} else if (process.env.NODE_ENV === 'production') {
	mLabUsername = process.env.MLAB_USERNAME;
	mLabPassword = process.env.MLAB_PASSWORD;

	dbURL = `mongodb://${mLabUsername}:${mLabPassword}@${config.host}:${
		config.port
	}/${config.db_name}`;
}

var connect = function(callback) {
	mongoose.connect(
		dbURL,
		err => {
			if (err) {
				callback('error');
			} else {
				callback(null);
			}
		}
	);
};

module.exports = { connect };
