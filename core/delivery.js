//input è l'oggetto JSON task che deve avere le proprietà
//exam-id(integer, not null), id-tested (integer, not null), id-reviewd (integer, not null),examples(array ,not null)

var fs = require('fs');

function postdelivery(exam_id,id_tested,id_reviewed,examples){
  if(Number.isInteger(id_tested) && Number.isInteger(id_reviewed)
    && Number.isInteger(exam_id) ){
    let imported = fs.readFileSync('db/deliveries.json', 'utf8');
    let delivery=JSON.parse(imported);
    let iddelivery=delivery.nextid;
    delivery.nextid=iddelivery+1;
		delivery['deliveries'].push({"id":iddelivery,"exam-id":exam_id,"tested-id":id_tested,
			"reviewed-id":id_reviewed,"examples":examples});
    let exported=JSON.stringify(delivery);
	  fs.writeFileSync('db/deliveries.json', exported);
    return {
      "status": 200,
      "jsonData": {"id":iddelivery}
    };
  }
  else return {"status":400, "jsonData": null};
}

function isJson(str) {
	try {
			JSON.parse(str);
	} catch (e) {
			return false;
	}
	return true;
}

/*function getdeliveryid(sid){
	if(Number.isInteger(sid) && sid > 0){
    let res = searchid(sid);
    if(res >= 0 || sid == -1){
      let imported = fs.readFileSync('db/users.json', 'utf8');

      let delivery=JSON.parse(imported);

      return {
        "status": 200,
        "jsonData": {"id":delivery['id'][res].id,"mat":delivery['users'][res].mat,
          "email":delivery['users'][res].email,"isTeacher":delivery['users'][res].isTeacher}
      };
    }
    else
    {
      return {"status":404, "jsonData": null};
    }
  }
  else {
    return {"status":400, "jsonData": null};
  }
}*/

function getdelivery(){

  let imported = fs.readFileSync('db/deliveries.json', 'utf8');

  return {"status": 200, "Deliveries":['deliveries']};

}

module.exports = {
	postdelivery,
  //getdeliveryid,
  getdelivery

};

function searchid (id){
  let imported = fs.readFileSync('db/deliveries.json', 'utf8')

	let list = JSON.parse(imported);
	var lookingAt=id;
	if(list.nextId<=id)
		return -1;

	else if (
				(list.deliveries[lookingAt]!=null
				&& list.deliveries[lookingAt]!=undefined
				&& list.deliveries[lookingAt].id==id)
			)
		return lookingAt;

	else {
		let beginSearch=0;
		let endSearch=list.deliveries.length-1;
		lookingAt=Math.floor(((beginSearch+endSearch)/2));
		do{
			lookingAt=Math.floor(((beginSearch+endSearch)/2));
			if(list.deliveries[lookingAt]==null)
			{
				let indice=lookingAt-1;
				while(indice>=beginSearch && list.deliveries[indice]==null)
					indice--;
				if(indice<beginSearch)
				{
					indice=lookingAt+1;
					while(indice<=endSearch && list.deliveries[indice]==null)
						indice++;
					if(indice>endSearch)
						return -1;
					else
					{
						if(list.deliveries[indice]<id)
							beginSearch=indice+1;
						else if (list.deliveries[indice]>id)
							endSearch=indice-1;
						else if(list.deliveries[indice]==id)
							return lookingAt;
					}
				}
				else
				{
					if(list.deliveries[indice]<id)
						beginSearch=indice+1;
					else if (list.deliveries[indice]>id)
						endSearch=indice-1;
					else if(list.deliveries[indice]==id)
						return lookingAt;
				}
			}
			else if(list.deliveries[lookingAt]<id)
				beginSearch=lookingAt+1;
			else if (list.deliveries[lookingAt]>id)
				endSearch=lookingAt-1;
			else if(list.deliveries[lookingAt]==id)
				return lookingAt;
		}while(beginSearch<=endSearch)
		return -1;
}
}
