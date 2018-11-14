const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const db = require('./services/db');
const path = require('path');

const app = express();

// start services
db.connect(err => {
	if (err) {
		throw new Error('Error Connecting to DB');
	}
});

app.use('/api', require('./components/Auth/AuthRoutes'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, '../client/build')));

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, err => {
	if (err) throw err;
	console.log(`ready at http://localhost:${PORT}`);
});
