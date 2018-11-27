var fs = require('fs');


function groupPost(nomeGruppo, listaMembri){
	if(typeof nomeGruppo === "string")
	{
		if(typeof listaMembri === "object" && listaMembri !=null)
		{
			let strtmp=[];
			var formatError = false;
			for(var i=0; i<listaMembri.length && !formatError; i++)
			{
				if(!(typeof listaMembri[i] === "number" && Number.isInteger(listaMembri[i])))
					formatError=true;
				if(!formatError)
					if(!esisteUser(listaMembri[i]))
						formatError=true;
				if(i==listaMembri.length-1)
				{
					//strtmp+='{userid:'+listamembri[i]+"},";
					let numero=listaMembri[i];
					strtmp.push({"userId":numero},);
				}
				else
				{
					//strtmp+='{userid:'+listamembri[i]+"}";
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


				//gruppi['groups'].push({"groupid":iddaassegnare,"groupname":nomegruppo,"userlist":[strtmp]});
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
	var utenti = JSON.parse(imported);
	var lookingAt=iduser-1;
	if(utenti.nextId<=iduser)
		return false;
	else if (utenti.users[lookingAt].id==idUser)
		return true;
	else {
		var beginSearch=0;
		var endSearch=utenti.nextId-1;
		do{
			if(utenti.users[lookingAt]<idUser)
				beginSearch=lookingAt+1;
			else if (utenti.users[lookingAt]>idUser)
				endSearch=lookingAt-1;
			else if(utenti.users[lookingAt]==idUser)
				return true;
			lookingAt=((beginSearch+endSearch)/2);
		}while(beginSearch<=endSearch)
		return false;
	}
}

module.exports = groupPost;
