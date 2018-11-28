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

let examJson = fs.readFileSync('./exams.json', 'utf8', function(err, data){
	if (err) throw err;
	let parsedJson = JSON.parse(data);
});
var exams = JSON.parse(examJson);

app.get('/exams', (req, res) => {
		res.contentType('application/json');
		res.json(exams);
		res.status(200);
})

app.post('/exams', (req, res) => {
	let newexam = req.body;
	let check = Exam.write(newexam);
	console.log("Check: ", check);
	if(check == 200){
		res.status(201);
		res.send("201 CREATED");
	}
	else{
		res.status(400);
		res.send("400 BAD REQUEST");
	}
})

app.get('/exams/:examID', (req, res) => {
	res.contentType('application/json');
	let examIndex = ExamId.idFound(req.params.examID);
	console.log("ExamIndex returned by IdFound to api: ", examIndex);
	if(examIndex > -1 ){
		try{
		res.json(ExamId.idGet(examIndex));
		res.status(200);
	}catch(error){console.log(error);}
	}
	else if(examIndex == -1){
		res.status(400);
		res.send("400 BAD REQUEST");
	}
	else if(examIndex == -2){
		res.status(404);
		res.send("404 ID NOT FOUND");
	}
})

app.delete('/exams/:examID', (req, res) => {
	let examIndex = ExamId.idFound(req.params.examID);
//	console.log(examIndex);
	if(examIndex > -1){
//		console.log('index: ', index);
		let check = ExamId.idDelete(examIndex);
		if(check == 200){
		res.status(204);
		res.send("204 EXAM DELETED");
		}
		else{
			res.status(500);
			res.send("500 INTERNAL SERVER ERROR");
		}
	}
	else if(index == -1){
		res.status(400);
		res.send("400 BAD REQUEST");
	}
	else if(examIndex == -2){
		res.status(404);
		res.send("404 ID NOT FOUND");
	}
})

app.put('/exams/:examID', (req,res) => {
	let examIndex = ExamId.idFound(req.params.examID);
	if(examIndex > -1){
		if(Exam.valid(req.body) == 200){
			let newexam = req.body;
			let check = ExamId.idPut(newexam, examIndex);
			if(check == 200){
				res.status(202);
				res.send("202 EXAM MODIFIED");
			}
			else{
				res.status(500);
				res.send("500 INTERNAL SERVER ERROR");
			}
		}
		else{
			res.status(400);
			res.send("400 BAD REQUEST");
		}
	}
	else if(examIndex == -1){
		res.status(400);
		res.send("400 BAD REQUEST");
	}
	else if(examIndex == -2){
		res.status(404);
		res.send("400 BAD REQUEST");
	}
})

app.listen(PORT, () => console.log('Example app listening on port ' + PORT))
