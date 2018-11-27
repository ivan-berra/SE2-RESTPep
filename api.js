const express = require('express')
const bodyParser = require('body-parser');
const taskpost = require('./taskpost');

const app = express()
const PORT = process.env.PORT || 3000


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'))

//tasks tenute in memoria dal server
var tasks = [{id: 12, aperta: false, consegna: 'Di che colore è il sole? | rosso | blu | verde | giallo', risoluzione: 'A', punteggiomax: 10}];
let taskIdCounter=12;

app.get('/tasks', (req, res) => {
		res.json(tasks);
})

app.post('/tasks', (req, res) => {
	let newtask = req.body;
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

app.listen(PORT, () => console.log('App listening on port ' + PORT))
