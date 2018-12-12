//input è l'oggetto JSON task che deve avere le proprietà
//id_Tgroup (integer, not null), id_task (integer, not null)
var fs = require('fs');

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

module.exports = 
	GETtaskgroup;