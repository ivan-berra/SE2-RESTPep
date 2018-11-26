const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log('Example app listening on port ' + PORT))

var users = [{
	id : 1,
	mat : 200912,
	email: "prova@test.com",
	isTeacher: false,
	}];

app.post('/api/users', function (req, res) {
	
	var user = req.body;
	user.id = product.length + 1;

	users.push(req.body);

	res.location("/api/users" + user.id);
	res.status(201);
	res.send();
});

app.get('/api/users', function (req, res) {

	res.contentType('application/json');

	var result = JSON.stringify(users);

	process.on('uncaughtException', function (err) {
		console.error((new Date).toUTCString() + 'UncaughtException:', 
err.message);
		console.error(err.stack);
		res.status(500).send();
		process.exit(1);
	})

	res.status(200);
	res.send(result);
})
