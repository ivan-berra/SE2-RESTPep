const express = require('express')
const bodyParser = require('body-parser');
const exampost = require('./exampost');

const app = express()
const PORT = process.env.PORT || 3000


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'))

var exams = [];

let examsIdCounter=0;

app.get('/exams', (req, res) => {
		res.json(exams);
})

app.post('/exams', (req, res) => {
	let newexam = req.body;
	let check = exampost(newexam.destinatario, newexam.deadline, newexam.tasksarray, newexam.autore, newexam.condivisi);
  console.log(newexam);
  console.log(check);
	if(check==200){
		examsIdCounter++;
		newexam.id=examsIdCounter;
		exams.push(newexam);
		res.send("201 CREATED");
	}
	else{
		res.send("500 BAD FORMAT");
	}
})

app.listen(PORT, () => console.log('Example app listening on port ' + PORT))
