const fs = require('fs');

function GETexams(){
	let response = {"status": null, "jsonData": null};
	try{
	let examJSON = fs.readFileSync('./db/exams.json', 'utf8');
		response.status = 200;
		response.jsonData = JSON.parse(examJSON);
		return response;
	}catch(error){response.status = 500; return response;}
}

module.exports = GETexams;
