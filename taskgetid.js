var fs = require("fs");

function taskgetid(searchedId){

    if (searchedId >= 0 && typeof searchedId === "number")
    {
        var searchedTask = esisteTask(searchedId);
        if (!searchedTask)
            return 404;
        else return 200;

    } else return 400;

}

function esisteTask(idTask)
{
	let imported = fs.readFileSync('./tasks.json', 'utf8', function (err, data) {
	if (err) throw err; // we'll not consider error handling for now
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

//console.log(taskgetid(0));

module.exports = taskgetid;

