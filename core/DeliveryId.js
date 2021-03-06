const fs = require('fs');
const delivery = require('./delivery');

function idFound(id){
  let deliveryID = parseInt(id);
//  console.log("idFound received ID: ", deliveryID);
//  console.log("is it a number? ",Number.isInteger(deliveryID));
  if(typeof deliveryID === "number" && Number.isInteger(deliveryID)){
    let deliveryJSON = fs.readFileSync('./db/deliveries.json', 'utf8');
    var deliveries = JSON.parse(deliveryJSON);
    const deliveryIndex = deliveries.deliveries.findIndex(obj => obj.examId == deliveryID);
    if(deliveryIndex != -1){
      return deliveryIndex;
    }
    else return -2;
  }
  else return -1;
}

function idGet(deliveryID){
  let response = {"status": null, "jsonData": null};
  let deliveryIndex = idFound(deliveryID);
  if(deliveryIndex > -1){
    let deliveryJSON = fs.readFileSync('./db/deliveries.json', 'utf8');
    var deliveries = JSON.parse(deliveryJSON);
//    console.log("delivery taken at deliveryIndex: ", deliveryIndex);
    response.jsonData = deliveries.deliveries[deliveryIndex];
    response.status = 200;
    return response;
  }
  else if(deliveryIndex == -1) {response.status = 400; return response;}
  else if(deliveryIndex == -2) {response.status = 404; return response;}
}

function idDelete(deliveryID){
  let deliveryIndex = idFound(deliveryID);
  if(deliveryIndex > -1){
    let deliveryJSON = fs.readFileSync('./db/deliveries.json', 'utf8');
    var deliveries = JSON.parse(deliveryJSON);
    deliveries.deliveries.splice(deliveryIndex, 1);
    let newJson = JSON.stringify(deliveries);
    fs.writeFileSync('./db/deliveries.json', newJson);
//    console.log("delivery deleted at deliveryIndex: ", deliveryIndex);
    return 204;
  }
  else if(deliveryIndex == -1) return 400;
  else if(deliveryIndex == -2) return 404;
}


module.exports.idFound = idFound;
module.exports.idGet = idGet;
module.exports.idDelete = idDelete;
