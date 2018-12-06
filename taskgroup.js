//input è l'oggetto JSON task che deve avere le proprietà
//id_Tgroup (integer, not null), id_task (integer, not null)
var fs = require('fs');


function Tgrouppost(id_Tgroup, tasklist){
	if(typeof id_Tgroup === "number" && Number.isInteger(id_Tgroup))
	{
		if(typeof tasklist === "object" && tasklist !=null)
		{
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
	return {
		"status": 400, 
		"jsonData": null
	  }; 
}

function Tgroupgetid(){
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


function Tgroupget(){
	let imported = fs.readFileSync('./Logical/taskgroup.json', 'utf8', function (err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
	});
	

    return {
		"status": 200, 
		"jsonData": {"id":imported.id_Tgroup}
	  }; 
}

module.exports = {
	Tgrouppost,
	Tgroupget,
	Tgroupgetid
};