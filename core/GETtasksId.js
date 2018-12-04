const checktaskid = require('./checktaskid');
const fs = require('fs');

function GETtasksId(id) {
	let res = {status: null, jsonData: null};
	let check = checktaskid(id);
	if(check==200){
		try{
			let data = fs.readFileSync('db/tasks.json', 'utf8',  (err, data) =>  { 
				if (err) throw err;
			});
	
			var obj = JSON.parse(data);
			let index = obj.tasks.findIndex(task => task.id == id);
			res.status = 200;
			res.jsonData = obj.tasks[index];
			return res;
		
		}catch(error){
			console.log(error);	
			res.status = 500;
			res.jsonData = "500 INTERNAL SERVER ERROR";
			return res;
		}
	}
	else if(check==400){
		res.status = 400;
		res.jsonData = "400 BAD REQUEST";
		return res;
	}
	else{
		res.status = 404;
		res.jsonData = "404 NOT FOUND";
		return res;
	}

}

module.exports = GETtasksId;
