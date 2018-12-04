const fs = require('fs');

function GETtasks ()  {

	let res={status: null, jsonData: null};

	let imported = fs.readFileSync('db/tasks.json', 'utf8', function (err, data) {
		if (err){
			res.status=500;
			return res;
		}
	});
	res.status = 200;
	res.jsonData = imported;
	return res;
}

module.exports = GETtasks;
