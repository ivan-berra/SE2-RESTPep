//input è l'oggetto JSON task che deve avere le proprietà
//id_Tgroup (integer, not null), id_task (integer, not null)
var fs = require('fs');


function Tgrouppost(tasklist){
		if(typeof tasklist === "object" && tasklist !=null)
		{
			let imported = fs.readFileSync('db/taskgroup.json', 'utf8');
			let taskgroup=JSON.parse(imported);
			let nextTgroup=taskgroup.nextId;
			taskgroup.nextId=nextTgroup+1;
			taskgroup['TGroups'].push({"id_Tgroup": nextTgroup, "tasks": tasklist});
			let exported=JSON.stringify(delivery);
	  	fs.writeFileSync('db/taskgroup.json', exported);
			return {
				"status": 200, 
				"jsonData": {"id":nextTgroup}
			  }; 
		}
		return {
			"status": 400, 
			"jsonData": null
		  }; 
	

}


//not now
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
}*/


function Tgroupget(){
	let imported = fs.readFileSync('./Logical/taskgroup.json', 'utf8', function (err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
	});
	
    return {
		"status": 200, 
		"jsonData": {"Gruppi":imported.Tgroups}
	  }; 
}

module.exports = {
	Tgrouppost,
	Tgroupget,
};