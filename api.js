const express = require('express')
const bodyParser = require('body-parser');
const taskpost = require('./taskpost');

const app = express()
const PORT = process.env.PORT || 3000


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'))

var tasks = [{id: 12, aperta: false, consegna: 'Di che colore è il sole? | rosso | blu | verde | giallo', risoluzione: 'A', punteggiomax: 10}];

let taskIdCounter=12;

app.get('/tasks', (req, res) => {
		res.json(tasks);
})

app.post('/tasks', (req, res) => {
	let newtask = req.body;
	//taskpost guarda se i campi sono formattati bene
	let check = taskpost(newtask.aperta, newtask.consegna, newtask.risoluzione, newtask.punteggiomax);
	//console.log(newtask);
	if(check==200){
		taskIdCounter++;
		newtask.id=taskIdCounter;
		tasks.push(newtask);
		res.send("201 CREATED");
	}
	else{
		res.send("500 BAD FORMAT");
	}
})

app.listen(PORT, () => console.log('Example app listening on port ' + PORT))
