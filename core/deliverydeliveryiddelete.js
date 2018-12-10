var fs = require('fs');

function deliverydeliveryiddelete(idDeliveryDaCancellare)
{
  //controlli
  if(arguments.length==1)
  {
    if(typeof idDeliveryDaCancellare === "number" && Number.isInteger(idDeliveryDaCancellare) && idDeliveryDaCancellare>=0)
    {
      let deliveryString = fs.readFileSync('db/deliveries.json', 'utf8', function (err, data) {
        if (err) throw err; // we'll not consider error handling for now
        var obj = JSON.parse(data);
      });
      let deliveryJson=JSON.parse(deliveryString);
      if(idDeliveryDaCancellare>=deliveryJson.nextId)
      {
        return 404;
      }
      else
      {
        //trovare il gruppogiainserito
        let beginSearch=0;
        let endSearch=deliveryJson.deliveries.length-1;
        let lookingAt=Math.floor(((beginSearch+endSearch)/2));
        let trovato=false;
        do {
          lookingAt=Math.floor(((beginSearch+endSearch)/2));
          let tmp=deliveryJson.deliveries[lookingAt];
          if(tmp==null)
          {
            //ricerca di un elemento usabile
            let indice=lookingAt-1;
            tmp=deliveryJson.deliveries[indice];
            while(indice>=beginSearch && tmp==null)
            {
              indice--;
              tmp=deliveryJson.deliveries[indice];
            }
            if(indice<beginSearch)
            {
              indice=lookingAt+1;
              tmp=deliveryJson.deliveries[indice];
              while(indice<=endSearch && tmp==null)
              {
                indice++;
                tmp=deliveryJson.deliveries[indice];
              }
              if(indice>endSearch)
              {
                return 404;
              }
              else
              {
                if(tmp.id==idDeliveryDaCancellare)
                  trovato=true;
                else if(tmp.id<idDeliveryDaCancellare)
                  beginSearch=indice+1;
                else
                  endSearch=indice-1;
              }
            }
            else
            {
              if(tmp.id==idDeliveryDaCancellare)
                trovato=true;
              else if(tmp.id<idDeliveryDaCancellare)
                beginSearch=indice+1;
              else
                endSearch=indice-1;
            }
          }
          else if(tmp.id==idDeliveryDaCancellare)
            trovato=true;
          else if(tmp.id<idDeliveryDaCancellare)
            beginSearch=lookingAt+1;
          else
            endSearch=lookingAt-1;
        } while (beginSearch<=endSearch && !trovato);
        if(!trovato)
        {
          return 404;
        }
        else
        {
          //cancellazione
          deliveryJson.deliveries.splice(lookingAt,1);
          fs.writeFileSync('./deliveries.json', JSON.stringify(deliveryJson));
          return 204;
        }
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

module.exports = deliverydeliveryiddelete;
