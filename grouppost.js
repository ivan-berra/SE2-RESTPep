var fs = require('fs');


function grouppost(nomegruppo, listamembri){
	if(typeof nomegruppo === "string")
	{
		if(typeof listamembri === "object" && listamembri !=null)
		{
			var fortmaterror = false;
			for(var i=0; i<listamembri.length && !fortmaterror; i++)
			{
				if(!(typeof listamembri[i] === "number" && Number.isInteger(listamembri[i])))
					fortmaterror=true;
				if(!fortmaterror)
					if(!esisteuser(listamembri[i]))
						fortmaterror=true;
			}
			if(!fortmaterror)
			{

				return 200;
			}
			else return 400;
		}
		else return 400;
	}
	else return 400;
}

//si suppone siano in ordine nel file
function esisteuser(iduser)
{
	//var imported = require('./users.json');
	var imported = fs.readFileSync('./users.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    var obj = JSON.parse(data);
	});
	/*var re = /\0/g;
	var utenti=JSON.parse(imported.toString().replace(re, ""));*/
	var utenti = JSON.parse(imported);
	var lookingat=iduser-1;
	if(utenti.nextid<=iduser)
		return false;
	else if (utenti.groups[lookingat].id==iduser)
		return true;
	else {
		var beginsearch=0;
		var endsearch=utenti.nextid-1;
		do{
			if(utenti.groups[lookingat]<iduser)
				beginsearch=lookingat+1;
			else if (utenti.groups[lookingat]>iduser)
				endsearch=lookingat-1;
			else if(utenti.groups[lookingat]==iduser)
				return true;
				lookingat=((beginsearch+endsearch)/2);
		}while(beginsearch>endsearch)
		return false;
	}
}

module.exports = grouppost;
