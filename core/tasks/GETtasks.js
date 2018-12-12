const fs = require('fs');

function GETtasks ()  {

	let res={status: null, jsonData: null};
	
	try{
		let imported = fs.readFileSync('db/tasks.json', 'utf8');
		let data = JSON.parse(imported);
		res.status = 200;
		res.jsonData = data;
		return res;
	}catch(error){
		//console.log('ERROR during GETtasks");
		res.status = 500;
		return res;
	}

}

module.exports = GETtasks;
