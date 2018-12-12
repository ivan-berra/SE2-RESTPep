const checktaskfields = require('../utils/checktaskfields');
const checktaskid = require('../utils/checktaskid');
const fs = require('fs');
 
function PUTtasksId (newtask, inputId){
	let res = null;

	if(newtask == null || inputId == null){
		return 400;
	}
	
	try{
		inputId = parseInt(inputId);
		let checkField = checktaskfields(newtask.aperta, newtask.consegna, newtask.risoluzione, newtask.punteggiomax);
		let index = checktaskid(inputId);
		if(index >=0){
			if(checkField==200){
					let data = fs.readFileSync('db/tasks.json', 'utf8');
					var obj = JSON.parse(data);
					obj.tasks[index].aperta=newtask.aperta;
					obj.tasks[index].consegna=newtask.consegna;
					obj.tasks[index].risoluzione=newtask.risoluzione;
					obj.tasks[index].punteggiomax=newtask.punteggiomax;
					json = JSON.stringify(obj); //reconvert to JSON
					fs.writeFileSync('db/tasks.json',json);
					res = 200;
			}
			else{
				res = 400;
			}
		}
		else if(index == "400 BAD FORMAT"){
			res = 400;
		}
		else{
			res = 404;
		}

		return res;
	}catch(error){
		//console.log(error);
		return 500;
	}
}

module.exports = PUTtasksId;
