const express = require('express');
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./UserModel');
const passport = require('passport');
const config = require('../../../config/config');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
	new GoogleStrategy(
		{
			clientID: config.apis.google.clientID,
			clientSecret: config.apis.google.clientSecret,
			callbackURL: 'http://localhost:5000/api/auth/google/callback'
		},
		function(accessToken, refreshToken, profile, cb) {
			console.log(profile);
			User.findOne({ providerId: profile.id }, (err, user) => {
				if (user) {
					cb(null, profile);
				} else {
					let newUser = new User({
						providerId: profile.id,
						provider: 'google',
						name: profile.displayName
					});

					newUser.save(err => {
						if (err) {
							throw new Error(err);
						} else {
							return cb(null, profile);
						}
					});
				}
			});
		}
	)
);

router.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['profile'] })
);

router.get('/auth/google/callback', function(req, res, next) {
	passport.authenticate('google', (err, user) => {
		console.log('user', user);
		if (err) {
			console.log(err);
		}

		var token = jwt.sign(user, config.jwt_secret, {
			expiresIn: '7d'
		});

		res.redirect(`http://localhost:3000?authcode=${token}`);
	})(req, res, next);
});

module.exports = router;
