//input è l'oggetto JSON task che deve avere le proprietà
//id_Tgroup (integer, not null), id_task (integer, not null)
var fs = require('fs');


function Tgrouppost(tasklist){
	let test=JSON.stringify(tasklist);
	if(isJson(test))
		{
			let imported = fs.readFileSync('db/taskgroup.json', 'utf8');
			let taskgroup=JSON.parse(imported);
			let idTaskgroup=taskgroup.nextId;
			taskgroup.nextId=idTaskgroup+1;
			taskgroup['Tgroups'].push({"id":idTaskgroup,"tasks": tasklist});
			let exported=JSON.stringify(taskgroup);
			fs.writeFileSync('db/deliveries.json', exported);
			return {
				"status": 200, 
				"jsonData": {"id":iddelivery}
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


/*function Tgroupgetid(){
	let imported = fs.readFileSync('./Logical/taskgroup.json', 'utf8', function (err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
    });

    let task=JSON.parse(imported);

    return {
		"status": 200, 
		"jsonData": {"id":iddelivery}
	  }; 
}
*/

function Tgroupget(){
	let imported = fs.readFileSync('./db/taskgroup.json', 'utf8', function (err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
	});
	

    return {
		"status": 200, 
		"jsonData": {"id":imported.nextId}
	  }; 
}

module.exports = {
	Tgrouppost,
	Tgroupget,
	Tgroupgetid
};