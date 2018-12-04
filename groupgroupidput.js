var fs = require('fs');

//nuovoNome o nuovalistaMembri possono essere null, ma non entrambi
function groupgroupidput(idgruppo, nuovoNome, nuovalistaMembri){
	if(arguments.length==3)
	{
		//if(typeof idgruppo==="number" && Number.isInteger(idgruppo) && idgruppo>=0 && typeof nuovoNome === "string" && typeof nuovalistaMembri === "object" && nuovalistaMembri !=null)
		if(typeof idgruppo==="number" && Number.isInteger(idgruppo) && idgruppo>=0 && (typeof nuovoNome === "string" || nuovoNome == null) && ((typeof nuovalistaMembri === "object" && nuovalistaMembri !=null)||(nuovalistaMembri == null)) && (!(nuovoNome == null && nuovalistaMembri == null)))
		{
			let gruppiString = fs.readFileSync('./groups.json', 'utf8', function (err, data) {
				if (err) throw err; // we'll not consider error handling for now
				var obj = JSON.parse(data);
			});
			let gruppiJson=JSON.parse(gruppiString);


			//ricerca del gruppo da modificare gruppiJson.groups[idgruppo]
			let gruppodamodificare=null;
			if (gruppiJson.groups[idgruppo]!=null && gruppiJson.groups[idgruppo]!=undefined && gruppiJson.groups[idgruppo].groupId==idgruppo)
				 gruppodamodificare=gruppiJson.groups[idgruppo];
			else {
				let beginSearch=0;
				let endSearch=gruppiJson.groups.length-1;
				lookingAt=((beginSearch+endSearch)/2);
				let finisciclo=false;
				do{
					lookingAt=((beginSearch+endSearch)/2);
					let tmp=gruppiJson.groups[lookingAt];
					if(tmp==null)
					{
						let indice=lookingAt-1;
						while(indice>=beginSearch && gruppiJson.groups[indice]==null)
							indice--;
						if(indice<beginSearch)
						{
							indice=lookingAt+1;
							while(indice<=endSearch && gruppiJson.groups[indice]==null)
								indice++;
							if(indice>endSearch)
								finisciclo=true;
							else
							{
								tmp=gruppiJson.groups[indice];
								if(tmp.groupId<idgruppo)
									beginSearch=indice+1;
								else if (tmp.groupId>idgruppo)
									endSearch=indice-1;
								else if(tmp.groupId==idgruppo)
									gruppodamodificare=tmp;
							}
						}
						else
						{
							if(tmp.groupId<idgruppo)
								beginSearch=indice+1;
							else if (tmp.groupId>idgruppo)
								endSearch=indice-1;
							else if(tmp.groupId==idgruppo)
								gruppodamodificare=tmp;
						}
					}
					else if(tmp.groupId<idgruppo)
						beginSearch=lookingAt+1;
					else if (tmp.groupId>idgruppo)
						endSearch=lookingAt-1;
					else if(tmp.groupId==idgruppo)
						gruppodamodificare=tmp;
				}while(beginSearch<=endSearch && gruppodamodificare==null && finisciclo==false)
			}




			if(gruppodamodificare==null)
			{
				esci:
				return 400;
			}
			else
			{
				if(!(nuovalistaMembri == null))
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
				}
				if(!(nuovoNome == null))
				{
					gruppodamodificare.groupName=nuovoNome;
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

//groupgroupidput(0,[1,2,3]);
module.exports = groupgroupidput;
