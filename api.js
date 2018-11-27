const express = require('express')
const bodyParser = require('body-parser');
const taskpost = require('./taskpost');

const app = express()
const PORT = process.env.PORT || 3000


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'))

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



app.listen(PORT, () => console.log('App listening on port ' + PORT))
