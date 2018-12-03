const express = require('express');
const bodyParser = require('body-parser');
const Exam = require('./Exam');
const ExamId = require('./ExamId');
const fs = require('fs');

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/exams', (req, res) => {
	let exams = Exam.get();
	if(exams[0] != 500){
		res.contentType('application/json');
		res.status(exams[0]);
		res.json(exams[1]);
	}
	else if(exams[0] == 500){
		res.status(check[0]);
		res.send("500 INTERNAL SERVER ERROR");
	}
})

app.post('/exams', (req, res) => {
	let check = Exam.write(req.body);
	console.log("Check: ", check);
	if(check[0] == 201){
		res.status(check[0]);
		res.send("201 EXAM CREATED");
	}
	else if(check[0] == 400){
		res.status(check[0]);
		res.send("400 BAD REQUEST");
	}
})

app.get('/exams/:examID', (req, res) => {
	res.contentType('application/json');
	try{
		let examJson = ExamId.idGet(req.params.examID);
		if(examJson[0] == 200){
			res.status(examJson[0]);
			res.json(examJson[1]);
		}
		if(examJson[0] == 400){
			res.status(examJson[0]);
			res.send("400 BAD REQUEST");
		}
		if(examJson[0] == 404){
			res.status(examJson[0]);
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

app.listen(PORT, () => console.log('Example app listening on port ' + PORT))
