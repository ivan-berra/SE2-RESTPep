var fs = require('fs');


function grouppost(nomeGruppo, listaMembri){
	if(arguments.length==2)
	{
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


					//gruppi['groups'].push({"groupId":idDaAssegnare,"groupName":nomegruppo,"userList":[strtmp]});
					gruppi['groups'].push({"groupId":idDaAssegnare,"groupName":nomeGruppo,"userList":[]});
					let exported=JSON.stringify(gruppi);
					let index=exported.lastIndexOf("[");
					exported=exported.substring(0,index)+JSON.stringify(strtmp)+'}'+exported.substring(index+1, exported.length-2);
					fs.writeFileSync('./groups.json', exported);
					return return {"status": 200, "id": idDaAssegnare};
				}
				else return return {"status": 400, "id": null};
			}
			else return {"status": 400, "id": null};
		}
		else return {"status": 400, "id": null};
	}
	else
	{
		return {"status": 400, "id": null};
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
	let tmp=utenti.users[lookingAt];
	if(utenti.nextId<=idUser)
		return false;
	else if (tmp!=null && tmp!=undefined && tmp.id==idUser)
		return true;
	else {
		let beginSearch=0;
		let endSearch=utenti.users.length-1;
		lookingAt=((beginSearch+endSearch)/2);
		do{
			lookingAt=((beginSearch+endSearch)/2);
			tmp=utenti.users[lookingAt];
			if(tmp==null)
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
						tmp=utenti.users[indice];
						if(tmp.id<idUser)
							beginSearch=indice+1;
						else if (tmp.id>idUser)
							endSearch=indice-1;
						else if(tmp.id==idUser)
							return true;
					}
				}
				else
				{
					tmp=utenti.users[indice];
					if(tmp.id<idUser)
						beginSearch=indice+1;
					else if (tmp.id>idUser)
						endSearch=indice-1;
					else if(tmp.id==idUser)
						return true;
				}
			}
			else if(tmp.id<idUser)
				beginSearch=lookingAt+1;
			else if (tmp.id>idUser)
				endSearch=lookingAt-1;
			else if(tmp.id==idUser)
				return true;
		}while(beginSearch<=endSearch)
		return false;
	}
}

//grouppost("provaloop",[1,2,3])

module.exports = grouppost;
