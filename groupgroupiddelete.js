var fs = require('fs');

function groupgroupiddelete(idgruppodacancellare)
{
  //controlli
  if(typeof idgruppodacancellare === "number" && Number.isInteger(idgruppodacancellare))
  {
    let gruppistring = fs.readFileSync('./groups.json', 'utf8', function (err, data) {
      if (err) throw err; // we'll not consider error handling for now
      var obj = JSON.parse(data);
    });
    let gruppijson=JSON.parse(gruppistring);
    if(idgruppodacancellare>=gruppijson.nextid)
    {
      return 400;
    }
    else
    {
      //trovare il gruppogiainserito
      let beginsearch=0;
      let endsearch=gruppijson.groups.length-1;
      let lookingat=((beginsearch+endsearch)/2);
      let trovato=false;
      do {
        let tmp=gruppijson.groups[lookingat];
        if(tmp.groupid==idgruppodacancellare)
          trovato=true;
        else if(tmp.groupid<idgruppodacancellare)
          beginsearch=lookingat+1;
        else
          endsearch=lookingat-1
        lookingat=((beginsearch+endsearch)/2);
      } while (beginsearch<=endsearch && !trovato);
      if(!trovato)
        return 400;
      else
      {
        //cancellazione
        gruppijson.groups.splice(lookingat,1);
        fs.writeFileSync('./groups.json', JSON.stringify(gruppijson));
        return 200;
      }
    }
  }
  else
  {
    return 400;
  }
}

module.exports = groupgroupiddelete;
