//input è l'oggetto JSON task che deve avere le proprietà
//id_Tgroup (integer, not null), id_task (integer, not null)
var fs = require('fs');


function Tgrouppost(id_Tgroup, tasklist){
	if(typeof id_Tgroup === "string")
	{
		if(typeof tasklist === "object" && tasklist !=null)
		{
			var format = false;
			for(var i=0; i<tasklist.length && !format; i++)
			{
				if(!(Number.isInteger(tasklist[i])))
					format=true;
				if(!format)
					if(!esisteduplicato(tasklist[i],i))
						format=true;
			}
			if(!format)
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
	let imported = fs.readFileSync('./taskgroup.json', 'utf8', function (err, data) {
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

// 
function Tgroupget(){
	let imported = fs.readFileSync('./taskgroup.json', 'utf8', function (err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
    });

    let task=JSON.parse(imported);

    return 200;
}

module.exports = {
	Tgrouppost,
	Tgroupget
};