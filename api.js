const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log('Example app listening on port ' + PORT))

var users = [];

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

	var result = users;

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

app.get('/api/users/:userId', function (req, res) {
	
	var searchedId = req.params.userId;

	if (searchedId < 1 || isNaN(searchedId))
	{
		res.status(400).send();
		return;
	}

	for (var i = 0; i < users.length; i++)
	{
		if(users[i].id == searchedId)
		{
			res.status(200);
			res.send(users[searchedId - 1]);
			return;
		}
	}

	res.status(404).send();

});

app.delete('/api/users/:userId', function (req, res) {
	
	var searchedId = req.params.userId;

	if (searchedId < 1 || isNaN(searchedId))
	{
		res.status(400).send();
		return;
	}

	for (var i = 0; i < users.length; i++)
	{
		if(users[i].id == searchedId)
		{
			res.status(204);
			delete users[searchedId - 1];
			res.send();
			return;
		}
	}

	res.status(404).send();

});
