var fs = require('fs');
var esisteUser = require("../utils/esisteUser");

function POSTgroup(nomeGruppo, listaMembri){
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
						if(esisteUser(listaMembri[i])==-1)
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
					let imported = fs.readFileSync('db/groups.json', 'utf8', function (err, data) {
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
					fs.writeFileSync('db/groups.json', exported);
					return {"status": 200, "id": idDaAssegnare};
				}
				else return {"status": 400, "id": null};
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


module.exports = POSTgroup;
