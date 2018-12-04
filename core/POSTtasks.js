const checktaskfields = require('./checktaskfields');
const fs = require('fs');

function POSTtasks (newtask){

	let res = {status: null, id: null};

	console.log("ricevuta richiesta POST su tasks");
	
	let check = checktaskfields(newtask.aperta, newtask.consegna, newtask.risoluzione, newtask.punteggiomax);

	if(check==200){
		try{
			let data = fs.readFileSync('db/tasks.json', 'utf8',  (err, data) =>  { 
				if (err) throw err;
			});
			obj = JSON.parse(data);
			newtask.id=obj.nextId;
			obj.nextId++;
			obj.tasks.push(newtask);
			json = JSON.stringify(obj); //reconvert to JSON
			fs.writeFile('db/tasks.json',json, (err) => {
				if (err) return console.log(err);
			});
			res.status = 201;
			res.id = newtask.id;
		}catch(error){
			console.log(error);
			res.status = 500;
		}
	}
	else{
		res.status(400);
	}

	return res;

}

module.exports = POSTtasks;
