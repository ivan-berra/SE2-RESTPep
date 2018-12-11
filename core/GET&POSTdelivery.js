//input è l'oggetto JSON task che deve avere le proprietà
//exam-id(integer, not null), id-tested (integer, not null), id-reviewd (integer, not null),examples(array ,not null)

var fs = require('fs');


//POST di una delivery. All' inizio i parametri vengono controllati e nel caso siano erronei
//ritorna errore 400 altrimenti procede con le operazioni
function postdelivery(exam_id,id_tested,id_reviewed,examples){
	let test=JSON.stringify(examples);
  if(Number.isInteger(id_tested) && Number.isInteger(id_reviewed)
    && Number.isInteger(exam_id) && isJson(test)){
    let imported = fs.readFileSync('db/deliveries.json', 'utf8');
    let delivery=JSON.parse(imported);
    let iddelivery=delivery.nextId;
    delivery.nextId=iddelivery+1;
		delivery['deliveries'].push({"id":iddelivery,"examId":exam_id,"tested-id":id_tested,
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

//funzione che passata una stringa identifica se sia un JSON o meno
function isJson(str) {
	try {
			JSON.parse(str);
	} catch (e) {
			return false;
	}
	return true;
}

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
