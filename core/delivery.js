//input è l'oggetto JSON task che deve avere le proprietà
//exam-id(integer, not null), id-tested (integer, not null), id-reviewd (integer, not null),examples(array ,not null)

var fs = require('fs');

function postdelivery(exam_id,id_tested,id_reviewed,examples){
	let test=JSON.stringify(examples);
  if(Number.isInteger(id_tested) && Number.isInteger(id_reviewed)
    && Number.isInteger(exam_id) && isJson(test)){
    let imported = fs.readFileSync('db/deliveries.json', 'utf8');
    let delivery=JSON.parse(imported);
    let iddelivery=delivery.nextid;true
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
	getdelivery,
	isJson
  
};

function searchid (id){
}