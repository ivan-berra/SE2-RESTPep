var fs = require('fs');

function groupgroupIddelete(idGruppoDaCancellare)
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
      return 400;
    }
    else
    {
      //trovare il gruppogiainserito
      let beginSearch=0;
      let endSearch=gruppiJson.groups.length-1;
      let lookingAt=((beginSearch+endSearch)/2);
      let trovato=false;
      do {
        let tmp=gruppiJson.groups[lookingAt];
        if(tmp.groupId==idGruppoDaCancellare)
          trovato=true;
        else if(tmp.groupId<idGruppoDaCancellare)
          beginSearch=lookingAt+1;
        else
          endSearch=lookingAt-1
        lookingAt=((beginSearch+endSearch)/2);
      } while (beginSearch<=endSearch && !trovato);
      if(!trovato)
        return 400;
      else
      {
        //cancellazione
        gruppiJson.groups.splice(lookingAt,1);
        fs.writeFileSync('./groups.json', JSON.stringify(gruppiJson));
        return 200;
      }
    }
  }
  else
  {
    return 400;
  }
}

module.exports = groupgroupIddelete;
