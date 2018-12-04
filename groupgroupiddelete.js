var fs = require('fs');

function groupgroupiddelete(idGruppoDaCancellare)
{
  //controlli
  if(typeof idGruppoDaCancellare === "number" && Number.isInteger(idGruppoDaCancellare) && idGruppoDaCancellare>=0)
  {
    let gruppiString = fs.readFileSync('./groups.json', 'utf8', function (err, data) {
      if (err) throw err; // we'll not consider error handling for now
      var obj = JSON.parse(data);
    });
    let gruppiJson=JSON.parse(gruppiString);
    if(idGruppoDaCancellare>=gruppiJson.nextId)
    {
      return 404;
    }
    else
    {
      //trovare il gruppogiainserito
      let beginSearch=0;
      let endSearch=gruppiJson.groups.length-1;
      let lookingAt=((beginSearch+endSearch)/2);
      let trovato=false;
      do {
        lookingAt=((beginSearch+endSearch)/2);
        let tmp=gruppiJson.groups[lookingAt];
        if(tmp==null)
        {
          //ricerca di un elemento usabile
          let indice=lookingAt-1;
          tmp=gruppiJson.groups[indice];
          while(indice>=beginSearch && tmp==null)
          {
            indice--;
            tmp=gruppiJson.groups[indice];
          }
          if(indice<beginSearch)
          {
            indice=lookingAt+1;
            tmp=gruppiJson.groups[indice];
            while(indice<=endSearch && tmp==null)
            {
              indice++;
              tmp=gruppiJson.groups[indice];
            }
            if(indice>endSearch)
            {
              return 404;
            }
            else
            {
              if(tmp.groupId==idGruppoDaCancellare)
                trovato=true;
              else if(tmp.groupId<idGruppoDaCancellare)
                beginSearch=indice+1;
              else
                endSearch=indice-1;
            }
          }
          else
          {
            if(tmp.groupId==idGruppoDaCancellare)
              trovato=true;
            else if(tmp.groupId<idGruppoDaCancellare)
              beginSearch=indice+1;
            else
              endSearch=indice-1;
          }
        }
        else if(tmp.groupId==idGruppoDaCancellare)
          trovato=true;
        else if(tmp.groupId<idGruppoDaCancellare)
          beginSearch=lookingAt+1;
        else
          endSearch=lookingAt-1;
      } while (beginSearch<=endSearch && !trovato);
      if(!trovato)
        return 404;
      else
      {
        //cancellazione
        gruppiJson.groups.splice(lookingAt,1);
        fs.writeFileSync('./groups.json', JSON.stringify(gruppiJson));
        return 204;
      }
    }
  }
  else
  {
    return 400;
  }
}

module.exports = groupgroupiddelete;
