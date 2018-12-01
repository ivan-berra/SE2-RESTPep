var fs = require('fs');

function groupgroupidput(idgruppo, nuovalistaMembri){
	if(arguments.length==2)
	{
		if(typeof idgruppo==="number" && Number.isInteger(idgruppo) && idgruppo>=0 && typeof nuovalistaMembri === "object" && nuovalistaMembri !=null)
		{
			let gruppiString = fs.readFileSync('./groups.json', 'utf8', function (err, data) {
				if (err) throw err; // we'll not consider error handling for now
				var obj = JSON.parse(data);
			});
			let gruppiJson=JSON.parse(gruppiString);
			let gruppodamodificare=gruppiJson.groups[idgruppo];
			if(gruppodamodificare==null)
			{
				return 400;
			}
			else
			{
				gruppodamodificare.userList.splice(0);
				for(var i=0; i<nuovalistaMembri.length; i++)
				{
					if(!(typeof nuovalistaMembri[i] === "number" && Number.isInteger(nuovalistaMembri[i]) && nuovalistaMembri[i]>=0))
						return 400;
					else if(!esisteUser(nuovalistaMembri[i]))
						return 400;
					if(i==nuovalistaMembri.length-1)
					{
						let numero=nuovalistaMembri[i];
						gruppodamodificare.userList.push({"userId":numero},);
					}
					else
					{
						let numero=nuovalistaMembri[i];
						gruppodamodificare.userList.push({"userId":numero});
					}
				}
				let exported=JSON.stringify(gruppiJson);
				fs.writeFileSync('./groups.json', exported);
				return 200;
			}
		}
		else
		{
			return 400;
		}
	}
	else
	{
		return 400;
	}
}

//si suppone siano in ordine nel file
function esisteUser(idUser)
{
	//var imported = require('./users.json');
	let imported = fs.readFileSync('./users.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    var obj = JSON.parse(data);
	});
	/*var re = /\0/g;
	var utenti=JSON.parse(imported.toString().replace(re, ""));*/
	let utenti = JSON.parse(imported);
	var lookingAt=idUser;
	if(utenti.nextId<=idUser)
		return false;
	else if (utenti.users[lookingAt].id==idUser)
		return true;
	else {
		let beginSearch=0;
		let endSearch=utenti.users.length-1;
		lookingAt=((beginSearch+endSearch)/2);
		do{
			lookingAt=((beginSearch+endSearch)/2);
			if(utenti.users[lookingAt]==null)
			{
				let indice=lookingAt-1;
				while(indice>=beginSearch && utenti.users[indice]==null)
					indice--;
				if(indice<beginSearch)
				{
					indice=lookingAt+1;
					while(indice<=endSearch && utenti.users[indice]==null)
						indice++;
					if(indice>endSearch)
						return false;
					else
					{
						if(utenti.users[indice]<idUser)
							beginSearch=indice+1;
						else if (utenti.users[indice]>idUser)
							endSearch=indice-1;
						else if(utenti.users[indice]==idUser)
							return true;
					}
				}
				else
				{
					if(utenti.users[indice]<idUser)
						beginSearch=indice+1;
					else if (utenti.users[indice]>idUser)
						endSearch=indice-1;
					else if(utenti.users[indice]==idUser)
						return true;
				}
			}
			else if(utenti.users[lookingAt]<idUser)
				beginSearch=lookingAt+1;
			else if (utenti.users[lookingAt]>idUser)
				endSearch=lookingAt-1;
			else if(utenti.users[lookingAt]==idUser)
				return true;
		}while(beginSearch<=endSearch)
		return false;
	}
}

//groupgroupidput(0,[1,2,3]);
module.exports = groupgroupidput;
