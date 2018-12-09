var fs = require('fs');

//aggiungere il return del json
function groupgroupidget(id){
  if(arguments.length==1)
  {
    if(typeof id === "number" && Number.isInteger(id) && id>=0)
    {
      //ricerca del gruppo
      let gruppiString = fs.readFileSync('db/groups.json', 'utf8', function (err, data) {
				if (err) throw err; // we'll not consider error handling for now
				var obj = JSON.parse(data);
			});
			let gruppiJson=JSON.parse(gruppiString);
      let lookingAt=id;
      let tmp=gruppiJson.groups[lookingAt];
      if(gruppiJson.nextId<=id)
      {
    		return {"status": 400, "jsonData": null};
      }
    	else if (tmp!=null && tmp!=undefined && tmp.groupId==id)
      {
        return {"status": 200, "jsonData": tmp};
      }
    	else
      {
    		let beginSearch=0;
    		let endSearch=gruppiJson.groups.length-1;
    		lookingAt=Math.floor(((beginSearch+endSearch)/2));
        do{
    			lookingAt=Math.floor(((beginSearch+endSearch)/2));
          tmp=gruppiJson.groups[lookingAt];
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
              {
                return {"status": 400, "jsonData": null};
              }
    					else
    					{
                tmp=gruppiJson.groups[indice];
    						if(tmp.groupId<id)
    							beginSearch=indice+1;
    						else if (tmp.groupId>id)
    							endSearch=indice-1;
    						else if(tmp.groupId==id)
                {
                  return {"status": 200, "jsonData": tmp};
                }
    					}
    				}
    				else
    				{
              tmp=gruppiJson.groups[indice];
    					if(tmp.groupId<id)
    						beginSearch=indice+1;
    					else if (tmp.groupId>id)
    						endSearch=indice-1;
    					else if(tmp.groupId==id)
              {
                return {"status": 200, "jsonData": tmp};
              }
    				}
    			}
    			else if(tmp.groupId<id)
    				beginSearch=lookingAt+1;
    			else if (tmp.groupId>id)
    				endSearch=lookingAt-1;
    			else if(tmp.groupId==id)
          {
            return {"status": 200, "jsonData": tmp};
          }
    		}while(beginSearch<=endSearch)
    		return {"status": 400, "jsonData": null};
      }
    }
    else
    {
      return {"status": 400, "jsonData": null};
    }
  }
  else
  {
    return {"status": 400, "jsonData": null};
  }
}

module.exports = groupgroupidget;
