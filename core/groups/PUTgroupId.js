var fs = require('fs');
var esisteUser = require("../utils/esisteUser");

//nuovoNome o nuovalistaMembri possono essere null, ma non entrambi
function PUTgroupId(idgruppo, nuovoNome, nuovalistaMembri){
	if(arguments.length==3)
	{
		//if(typeof idgruppo==="number" && Number.isInteger(idgruppo) && idgruppo>=0 && typeof nuovoNome === "string" && typeof nuovalistaMembri === "object" && nuovalistaMembri !=null)
		if(typeof idgruppo==="number" && Number.isInteger(idgruppo) && idgruppo>=0 && (typeof nuovoNome === "string" || nuovoNome == null) && ((typeof nuovalistaMembri === "object" && nuovalistaMembri !=null)||(nuovalistaMembri == null)) && (!(nuovoNome == null && nuovalistaMembri == null)))
		{
			let gruppiString = fs.readFileSync('db/groups.json', 'utf8', function (err, data) {
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
				lookingAt=Math.floor(((beginSearch+endSearch)/2));
				let finisciclo=false;
				do{
					lookingAt=Math.floor(((beginSearch+endSearch)/2));
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
						else if(esisteUser(nuovalistaMembri[i])==-1)
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
				fs.writeFileSync('db/groups.json', exported);
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

module.exports = PUTgroupId;
