const express = require('express');
const bodyParser = require('body-parser');
const Exam = require('./core/Exam');
const ExamId = require('./core/ExamId');
const fs = require('fs');
const taskpost = require('./taskpost');

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log('Example app listening on port ' + PORT))

/*
var users = [];

app.post('/api/users', function (req, res) {

	var user = req.body;

	if(typeof user != 'undefined'         ||
	   typeof user.matricola != undefined ||
           typeof user.email != undefined     ||
           typeof user.isTeacher != undefined)
	{
		user.id = users.length + 1;

		users.push(req.body);

		res.status(201);

		res.send(users[users.length - 1]);
	}
	else
	{
		console.log("I dati ricevuti sono incompleti per creare un
utente.");
		res.status(400).send();
	};
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

app.get('/exams', (req, res) => {
	let response = Exam.get();
	if(response.status != 500){
		res.contentType('application/json');
		res.status(response.status);
		res.json(response.jsonData);
	}
	else if(response.status == 500){
		res.status(response.status);
		res.send("500 INTERNAL SERVER ERROR");
	}
})

app.post('/exams', (req, res) => {
	let response = Exam.write(req.body);
	console.log("Response: ", response);
	if(response.status == 201){
		res.status(response.status);
		res.send("201 EXAM CREATED WITH ID: ", response.examId.toString());
	}
	else if(response.status == 400){
		res.status(response.status);
		res.send("400 BAD REQUEST");
	}
})

app.get('/exams/:examID', (req, res) => {
	res.contentType('application/json');
	try{
		let response = ExamId.idGet(req.params.examID);
		if(response.status == 200){
			res.status(response.status);
			res.json(response.jsonData);
		}
		if(response.status == 400){
			res.status(response.jsonData);
			res.send("400 BAD REQUEST");
		}
		if(responsae.status == 404){
			res.status(response.status);
			res.send("404 ID NOT FOUND");
		}
	}catch(error){console.log(error);}
})

app.delete('/exams/:examID', (req, res) => {
	try{
		let check = ExamId.idDelete(req.params.examID);
		if(check == 204){
			res.status(200); //per qualche motivo mettendo 204 non manda la stringa "204 EXAM DELETED"
			res.send("204 EXAM DELETED");
		}
		else if(check == 400){
			res.status(400);
			res.send("400 BAD REQUEST");
		}
		else if(check == 404){
			res.status(404);
			res.send("404 ID NOT FOUND");
		}
	}catch(error){console.log(error);}
})

app.put('/exams/:examID', (req,res) => {
	try{
			let check = ExamId.idPut(req.body, req.params.examID);
			if(check == 202){
				res.status(202);
				res.send("202 EXAM MODIFIED");
			}
			else if(check == 400){
				res.status(400);
				res.send("400 BAD REQUEST");
			}
			else if(check == 404){
				res.status(404);
				res.send("404 ID NOT FOUND");
			}
	}catch(error){console.log(error);}
})


/*

//tasks tenute in memoria dal server
var tasks = [{id: 0, aperta: false, consegna: 'Domanda 1 | scelta 1 | scelta 2 | scelta 3 | scelta 4', risoluzione:'1|4', punteggiomax: 10}];

//id della prossima task da inserire
let taskIdCounter=1;

app.get('/tasks', (req, res) => {
	try{
		res.json(tasks);
	}catch(error){
		res.status(500);
		res.send("500 INTERNAL SERVER ERROR");
	}
	})

app.post('/tasks', (req, res) => {
	let newtask = req.body;
	console.log(newtask);
	//taskpost guarda se i campi sono formattati bene
	let check = taskpost(newtask.aperta, newtask.consegna, newtask.risoluzione, newtask.punteggiomax);
	if(check==200){
		try{
			newtask.id=taskIdCounter;
			tasks.push(newtask);
		}catch(error){
			console.log(error);
			res.status(500);
			res.send("500 INTERNAL SERVER ERROR");
		}
		taskIdCounter++;
		res.status(201);
		res.json(newtask);
	}
	else{
		res.status(400);
		res.send("400 BAD REQUEST");
	}
})

app.get('/tasks/:id', (req, res) => {

	let id =  req.params.id;
	if (id > tasks.length || id < 0 || isNaN(id)) {
		res.status(404);
		res.send('404 NOT FOUND');
		return;
	}
	else{
		res.send(tasks[id-1]);
	}
});

*/

const GETtasks = require('./core/GETtasks');
const POSTtasks = require('./core/POSTtasks');
const GETtasksId = require('./core/GETtasksId');
const DELETEtasksId = require('./core/DELETEtasksId');
const PUTtasksId = require('./core/PUTtasksId');

app.get('/tasks', (req, res) => {

	let toSend = GETtasks();
	res.setHeader('Content-Type', 'application/json');
	res.status(toSend.status);
	res.send(toSend.jsonData);

})

app.get('/tasks/:id', (req, res) => {

	let toSend = GETtasksId(parseInt(req.params.id));
	res.status(toSend.status);
	if(toSend.status == 200){
		res.send(toSend.jsonData);
	}

})

app.post('/tasks', (req, res) => {

	let toSend = POSTtasks(req.body);
	res.status(toSend.status);
	if(toSend.status == 201){
		res.send(toSend.id.toString());
	} 

})

app.put('/tasks/:id', (req, res) => {
	
	let toSend = PUTtasksId(req.body, req.params.id);
	res.status(toSend);
	res.send(toSend.toString());
})

app.delete('/tasks/:id', (req, res) => {

	let toSend = DELETEtasksId(req.params.id);
	res.status(toSend);
	res.send(toSend.toString());

})







