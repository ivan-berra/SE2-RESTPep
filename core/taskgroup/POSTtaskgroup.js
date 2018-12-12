var fs = require('fs');


function POSTtaskgroup(tasklist){
	let test=JSON.stringify(tasklist);
	if(isJson(test) && tasklist != null)
		{
			let imported = fs.readFileSync('db/taskgroup.json', 'utf8');
			let taskgroup=JSON.parse(imported);
			let idTaskgroup=taskgroup.nextId;
			taskgroup.nextId=idTaskgroup+1;
			taskgroup['Tgroups'].push({"id":idTaskgroup,"tasks": tasklist});
			let exported=JSON.stringify(taskgroup);
			fs.writeFileSync('db/taskgroup.json', exported);
			return {
				"status": 200, 
				"jsonData": {"id":idTaskgroup}
			  };
		}
	return {
		"status": 400, 
		"jsonData": null
	  }; 
}


//funzione che passata una stringa identifica se sia un JSON o meno
function isJson(str) {
	try {
			JSON.parse(str);
	} catch (e) {
			return false;
	}
	return true;
}

module.exports = {
    POSTtaskgroup,
    isJson
};