//input è l'oggetto JSON task che deve avere le proprietà
//id_Tgroup (integer, not null), id_task (integer, not null)
var fs = require('fs');


function Tgrouppost(id_Tgroup, tasklist){
	if(typeof id_Tgroup === "string")
	{
		if(typeof tasklist === "object" && tasklist !=null)
		{
			var format_error = false;
			for(var i=0; i<tasklist.length && !format_error; i++)
			{
				if(!(Number.isInteger(tasklist[i])))
					format_error=true;
				if(!format_error)
					if(!esisteduplicato(tasklist[i],i))
						format_error=true;
			}
			if(!format_error)
			{   
				return 200;
            }
            else
             return 400;
		}
		else return 400;
	}
	else return 400;
}
//si suppone siano in ordine nel file
function esisteduplicato(id_task,pos)
{
	//var imported = require('./users.json');
	let imported = fs.readFileSync('./Logical/taskgroup.json', 'utf8', function (err, data) {
        if (err) throw err; // we'll not consider error handling for now
        var obj = JSON.parse(data);
	});
	var taskL = JSON.parse(imported);
    var lookingat = 0;
    var max = taskL.length;
	do{
        let robo =  taskL.tasks[lookingat];
        if (robo.id==id_task && lookingat != pos ){
            return true;
        }
        lookingat++;
    }while(lookingat<max)
    return false;
}

module.exports = Tgrouppost;