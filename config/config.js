const env = process.env.NODE_ENV || 'dev';

const environmentSettings = {
	dev: {
		host: 'localhost',
		oauthGoogleCallBackUrl: 'http://localhost:3000/api/auth/google/callback'
	},
	production: {
		host: 'ds037688.mlab.com',
		port: 37688,
		oauthGoogleCallBackUrl:
			'https://jetly-react.herokuapp.com//api/auth/google/callback'
	}
};

const global = {
	jwt_secret: 'motherspie',
	db_name: 'jetly',
	apis: {
		google: {
			clientID:
				'1027177071681-7qjn1nfuc9l2j5p2t72emfodlogscq1u.apps.googleusercontent.com',
			clientSecret: 'b3Pq_lO-Nxnmj79Qsy_T4qNO'
		}
	}
};

module.exports = Object.assign(environmentSettings[env], global);
