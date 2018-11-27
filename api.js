const express = require('express')
const bodyParser = require('body-parser');
const exampost = require('./exampost');
const fs = require('fs');

const app = express()
const PORT = process.env.PORT || 3000


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('HOMEPAGE'))

let examJson = fs.readFileSync('./exams.json', 'utf8', function(err, data){
	if (err) throw err;
	var parsedJson = JSON.parse(data);
});
var exams = JSON.parse(examJson);

let examsIdCounter=1;

app.get('/exams', (req, res) => {
		res.json(exams);
})

app.post('/exams', (req, res) => {
	let newexam = req.body;
	let check = exampost(newexam.destinatario, newexam.deadline, newexam.tasksarray, newexam.autore, newexam.condivisi);
	if(check==200){
		examsIdCounter++;
		newexam.id=exams.nextid;
		exams.exams.push(newexam);
		exams.nextid ++;
		let newJson = JSON.stringify(exams);
		fs.writeFileSync('./exams.json', newJson);
		res.send("201 CREATED");
	}
	else{
		res.send("500 BAD FORMAT");
	}
})


app.listen(PORT, () => console.log('Example app listening on port ' + PORT))
