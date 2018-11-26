//input è l'oggetto JSON task che deve avere le proprietà
//id (integer, not null)

function postdelivery(id){
	if(Number.isInteger(id)){
    return 200;
  }
  else {
    return 400;
  }
}

function getdelivery(){
	if(typeof id === "number" && Number.isInteger(id)){
    return 200;
  }
  else {
    return 400;
  }
}

module.exports = delivery;
