var fs = require("fs");

function taskgetid(searchedId){

    if (searchedId > 0 && typeof searchedId === "number")
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
	if(mytasks.nextId<=idTask)
		return false;
	else if (mytasks.tasks[lookingAt].id==idTask)
		return true;
	else {
		var beginSearch=0;
		var endSearch=mytasks.nextId-1;
		do{
		console.log(beginSearch);
		console.log(endSearch);
			if(mytasks.tasks[lookingAt]<idTask)
				beginSearch=lookingAt+1;
			else if (mytasks.tasks[lookingAt]>idTask)
				endSearch=lookingAt-1;
			else if(mytasks.tasks[lookingAt]==idTask)
				return true;
			lookingAt=((beginSearch+endSearch)/2);
		}while(beginSearch<=endSearch)
		return false;
	}
}

//loop infinito
//console.log(taskgetid(4));

module.exports = taskgetid;

