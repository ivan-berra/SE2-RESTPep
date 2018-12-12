const checktaskid = require('../utils/checktaskid');
const fs = require('fs');

function GETtasksId(id) {
	let res = {status: null, jsonData: null};
	try{
		if(id == null){
			res.status = 400;
			return res;
		}
		let index = checktaskid(id);
		if(index>=0){
			let data = fs.readFileSync('db/tasks.json', 'utf8');
			var obj = JSON.parse(data);
			res.status = 200;
			res.jsonData = obj.tasks[index];
			return res;
		}
		else if(index == "400 BAD FORMAT"){
			res.status = 400;
			return res;
		}
		else{  
			res.status = 404;
			return res;
		}

	}catch(error){
		//console.log(error);
		res.status = 500;
		return res;
	}
}

module.exports = GETtasksId;
