var fs = require('fs');


function grouppost(nomeGruppo, listaMembri){
	if(typeof nomeGruppo === "string")
	{
		if(typeof listaMembri === "object" && listaMembri !=null)
		{
			let strtmp=[];
			var formatError = false;
			for(var i=0; i<listaMembri.length && !formatError; i++)
			{
				if(!(typeof listaMembri[i] === "number" && Number.isInteger(listaMembri[i]) && listaMembri[i]>=0))
					formatError=true;
				if(!formatError)
					if(!esisteUser(listaMembri[i]))
						formatError=true;
				if(i==listaMembri.length-1)
				{
					//strtmp+='{userId:'+listamembri[i]+"},";
					let numero=listaMembri[i];
					strtmp.push({"userId":numero},);
				}
				else
				{
					//strtmp+='{userId:'+listamembri[i]+"}";
					let numero=listaMembri[i];
					strtmp.push({"userId":numero});
				}
			}
			if(!formatError)
			{
				//INSERIMENTO EFFETTIVO
				let imported = fs.readFileSync('./groups.json', 'utf8', function (err, data) {
			    if (err) throw err; // we'll not consider error handling for now
			    var obj = JSON.parse(data);
				});
				let gruppi=JSON.parse(imported);
				let idDaAssegnare=gruppi.nextId;
				gruppi.nextId=idDaAssegnare+1;


				//gruppi['groups'].push({"groupId":iddaassegnare,"groupName":nomegruppo,"userList":[strtmp]});
				gruppi['groups'].push({"groupId":idDaAssegnare,"groupName":nomeGruppo,"userList":[]});
				let exported=JSON.stringify(gruppi);
				let index=exported.lastIndexOf("[");
				exported=exported.substring(0,index)+JSON.stringify(strtmp)+'}'+exported.substring(index+1, exported.length-2);
				fs.writeFileSync('./groups.json', exported);
				return 200;
			}
			else return 400;
		}
		else return 400;
	}
	else return 400;
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

//grouppost("provaloop",[1,2,3])

module.exports = grouppost;
