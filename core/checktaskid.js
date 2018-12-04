 var fs = require("fs");

function checktaskid(searchedId){
    if (typeof searchedId==="number" && Number.isInteger(searchedId) && searchedId >= 0)
    {
        var searchedTask = esisteTask(searchedId);
        if (!searchedTask)
            return 404;
        else return 200;

    } else return 400;

}

function esisteTask(idTask)
{
	let imported = fs.readFileSync('db/tasks.json', 'utf8', function (err, data) {
		if (err) {
			console.log('ERROR READING THE FILE TASKS.JSON');
			throw err;
		}
		var obj = JSON.parse(data);
	});

	var mytasks = JSON.parse(imported);	
	var lookingAt=idTask;
	if(mytasks.nextId<=idTask) return false;

	let tmp = mytasks.tasks[lookingAt];

	if(typeof tmp != 'undefined' && typeof tmp.id != 'undefined'){
		if (tmp.id==idTask) return true;	
	}

	let res = mytasks.tasks.findIndex(obj => obj.id == idTask);
	if(res != -1) return true;
	else return false;
}

module.exports = checktaskid;

