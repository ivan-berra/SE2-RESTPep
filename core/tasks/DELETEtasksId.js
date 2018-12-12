const checktaskid = require('../utils/checktaskid');
const fs = require('fs');

function DELETEtasksId (inputId){

	if(inputId == null){
		return 400;
	}
	try{
		inputId = parseInt(inputId);
		let res = null;
		let index = checktaskid(inputId);
		if(index >= 0){
				let data = fs.readFileSync('db/tasks.json', 'utf8');
				var obj = JSON.parse(data);
				obj.tasks.splice(index, 1);
				json = JSON.stringify(obj); //reconvert to JSON
				fs.writeFileSync('db/tasks.json',json);
				res = 204;
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

module.exports = DELETEtasksId;
