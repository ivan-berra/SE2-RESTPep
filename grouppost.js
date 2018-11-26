var fs = require('fs');


function grouppost(nomegruppo, listamembri){
	if(typeof nomegruppo === "string")
	{
		if(typeof listamembri === "object" && listamembri !=null)
		{
			let strtmp=[];
			var fortmaterror = false;
			for(var i=0; i<listamembri.length && !fortmaterror; i++)
			{
				if(!(typeof listamembri[i] === "number" && Number.isInteger(listamembri[i])))
					fortmaterror=true;
				if(!fortmaterror)
					if(!esisteuser(listamembri[i]))
						fortmaterror=true;
				if(i==listamembri.length-1)
				{
					//strtmp+='{userid:'+listamembri[i]+"},";
					let numero=listamembri[i];
					strtmp.push({"userid":numero},);
				}
				else
				{
					//strtmp+='{userid:'+listamembri[i]+"}";
					let numero=listamembri[i];
					strtmp.push({"userid":numero});
				}
			}
			if(!fortmaterror)
			{
				//INSERIMENTO EFFETTIVO
				let imported = fs.readFileSync('./groups.json', 'utf8', function (err, data) {
			    if (err) throw err; // we'll not consider error handling for now
			    var obj = JSON.parse(data);
				});
				let gruppi=JSON.parse(imported);
				let iddaassegnare=gruppi.nextid;
				gruppi.nextid=iddaassegnare+1;


				//gruppi['groups'].push({"groupid":iddaassegnare,"groupname":nomegruppo,"userlist":[strtmp]});
				gruppi['groups'].push({"groupid":iddaassegnare,"groupname":nomegruppo,"userlist":[]});
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
function esisteuser(iduser)
{
	//var imported = require('./users.json');
	let imported = fs.readFileSync('./users.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    var obj = JSON.parse(data);
	});
	/*var re = /\0/g;
	var utenti=JSON.parse(imported.toString().replace(re, ""));*/
	var utenti = JSON.parse(imported);
	var lookingat=iduser-1;
	if(utenti.nextid<=iduser)
		return false;
	else if (utenti.users[lookingat].id==iduser)
		return true;
	else {
		var beginsearch=0;
		var endsearch=utenti.nextid-1;
		do{
			if(utenti.users[lookingat]<iduser)
				beginsearch=lookingat+1;
			else if (utenti.users[lookingat]>iduser)
				endsearch=lookingat-1;
			else if(utenti.users[lookingat]==iduser)
				return true;
				lookingat=((beginsearch+endsearch)/2);
		}while(beginsearch>endsearch)
		return false;
	}
}

module.exports = grouppost;
