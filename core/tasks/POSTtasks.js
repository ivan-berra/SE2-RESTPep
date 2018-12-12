const checktaskfields = require('../utils/checktaskfields');
const fs = require('fs');

function POSTtasks (newtask){

	let res = {status: null, id: null};
	try{
		if(newtask == null){
			res.status = 400;
			return res;
		}

		let check = checktaskfields(newtask.aperta, newtask.consegna, newtask.risoluzione, newtask.punteggiomax);

		if(check==200){
			let data = fs.readFileSync('db/tasks.json', 'utf8');
			obj = JSON.parse(data);
			newtask.id=obj.nextId;
			obj.nextId++;
			obj.tasks.push(newtask);
			json = JSON.stringify(obj); //reconvert to JSON
			fs.writeFileSync('db/tasks.json',json);
			res.status = 201;
			res.id = newtask.id;
		}
		else{
			res.status = 400;
		}

		return res;
	}catch(error){
		//console.log(error);
		res.status = 500;
		return res;
	}
}

module.exports = POSTtasks;
