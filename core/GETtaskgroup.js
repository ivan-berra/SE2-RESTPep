//input è l'oggetto JSON task che deve avere le proprietà
//id_Tgroup (integer, not null), id_task (integer, not null)
var fs = require('fs');


/*function Tgrouppost(tasklist){
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

function GETtaskgroup(){
	/*let imported = fs.readFileSync('./db/taskgroup.json', 'utf8', function (err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
	});*/
	let imported = fs.readFileSync('db/taskgroup.json', 'utf8');

    let obj = JSON.parse(imported);


    return {
		"status": 200, 
		"jsonData": obj.Tgroups
	  }; 
}

module.exports = {
	//Tgrouppost,
	GETtaskgroup
	//isJson
	//Tgroupgetid
};