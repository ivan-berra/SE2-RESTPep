 var fs = require("fs");

//Funzione che controlla la giusta formattazione dell'id sulla risorsa tasks e ritorna la posizione nel database
//Restituisce:
// - numero >= 0 che indica la posizione della task con lo specifico id
// - "400 BAD FORMAT" se ci sono problemi di formattazione dell'id della task
// - "404 NOT FOUND" se la task con id specificato non è stata trovata

function checktaskid(searchedId){
    if (typeof searchedId==="number" && Number.isInteger(searchedId) && searchedId >= 0)
    {
        var index = esisteTask(searchedId);
	if (index >= 0) return index;
        else return "404 NOT FOUND";

    } else return "400 BAD FORMAT";
}

function esisteTask(idTask)
{
	let imported = fs.readFileSync('db/tasks.json', 'utf8');
	var mytasks = JSON.parse(imported);
	
	if(mytasks.nextId<=idTask) return -1;

	let res = mytasks.tasks.findIndex(obj => obj.id == idTask);
	return res;
}

module.exports = checktaskid;

