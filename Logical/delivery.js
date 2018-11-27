//input è l'oggetto JSON task che deve avere le proprietà
//id-tested (integer, not null), id-reviewd (integer, not null)

function postdelivery(id_tested, id_reviewd){
	if(Number.isInteger(id_tested) && Number.isInteger(id_reviewd)){
    return 200;
  }
  else {
    return 400;
  }
}

function getdelivery(){
	if(Number.isInteger(id)){
    return 200;
  }
  else {
    return 400;
  }
}

module.exports = {
	postdelivery,
	getdelivery
};
