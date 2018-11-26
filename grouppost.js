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
module.exports = grouppost;
