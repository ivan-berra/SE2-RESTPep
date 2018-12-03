var fs = require('fs');

//aggiungere il return del json
function groupgroupidget(id){
  if(arguments.length==1)
  {
    if(typeof id === "number" && Number.isInteger(id) && id>=0)
    {
      //ricerca del gruppo
      let gruppiString = fs.readFileSync('./groups.json', 'utf8', function (err, data) {
				if (err) throw err; // we'll not consider error handling for now
				var obj = JSON.parse(data);
			});
			let gruppiJson=JSON.parse(gruppiString);
      let lookingAt=id;
      //RICORDARSI DI FAR RESTITUIRE I JSON
      if(gruppiJson.nextId<=id)
    		return 400;
    	else if (gruppiJson.groups[lookingAt]!=null && gruppiJson.groups[lookingAt]!=undefined && gruppiJson.groups[lookingAt].id==id)
    		return 200;
    	else
      {
    		let beginSearch=0;
    		let endSearch=gruppiJson.groups.length-1;
    		lookingAt=((beginSearch+endSearch)/2);
        do{
    			lookingAt=((beginSearch+endSearch)/2);
    			if(gruppiJson.groups[lookingAt]==null)
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
    						return 400;
    					else
    					{
    						if(gruppiJson.groups[indice]<id)
    							beginSearch=indice+1;
    						else if (gruppiJson.groups[indice]>id)
    							endSearch=indice-1;
    						else if(gruppiJson.groups[indice]==id)
    							return 200;
    					}
    				}
    				else
    				{
    					if(gruppiJson.groups[indice]<id)
    						beginSearch=indice+1;
    					else if (gruppiJson.groups[indice]>id)
    						endSearch=indice-1;
    					else if(gruppiJson.groups[indice]==id)
    						return 200;
    				}
    			}
    			else if(gruppiJson.groups[lookingAt]<id)
    				beginSearch=lookingAt+1;
    			else if (gruppiJson.groups[lookingAt]>id)
    				endSearch=lookingAt-1;
    			else if(gruppiJson.groups[lookingAt]==id)
    				return 200;
    		}while(beginSearch<=endSearch)
    		return 400;
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

module.exports = groupgroupidget;
