const checktaskfields = require('./checktaskfields');
const checktaskid = require('./checktaskid');
const fs = require('fs');
 
function PUTtasksId (newtask, inputId){
	let res = null;
	inputId = parseInt(inputId);
	let checkField = checktaskfields(newtask.aperta, newtask.consegna, newtask.risoluzione, newtask.punteggiomax);
	let checkId = checktaskid(inputId);
	if(checkId == 200){
		if(checkField==200){
			try{
				let data = fs.readFileSync('db/tasks.json', 'utf8',  (err, data) =>  { 
					if (err) throw err;
				});
				var obj = JSON.parse(data);
				let index = obj.tasks.findIndex(task => task.id == inputId);
				obj.tasks[index].aperta=newtask.aperta;
				obj.tasks[index].consegna=newtask.consegna;
				obj.tasks[index].risoluzione=newtask.risoluzione;
				obj.tasks[index].punteggiomax=newtask.punteggiomax;
				json = JSON.stringify(obj); //reconvert to JSON
				fs.writeFile('db/tasks.json',json, (err) => {
					if (err) throw err;
				});
				res = 200;
			}catch(error){
				console.log(error);
				res = 500;
			}

		}
		else{
			res = 500;
		}
	}
	else if(checkId==400){
		res = 400;
	}
	else{
		res = 404;
	}

	return res;

}

module.exports = PUTtasksId;
