const fs = require('fs');
const delivery = require('./delivery');

function idFound(id){
  let deliveryID = parseInt(id);
//  console.log("idFound received ID: ", deliveryID);
//  console.log("is it a number? ",Number.isInteger(deliveryID));
  if(typeof deliveryID === "number" && Number.isInteger(deliveryID)){
    let deliveryJSON = fs.readFileSync('./Logical/deliveries.json', 'utf8');
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
  let deliveryIndex = idFound(deliveryID);
  if(deliveryIndex > -1){
    let deliveryJSON = fs.readFileSync('./Logical/deliveries.json', 'utf8');
    var deliveries = JSON.parse(deliveryJSON);
//    console.log("delivery taken at deliveryIndex: ", deliveryIndex);
    return deliveries.deliveries[deliveryIndex];
  }
  else if(deliveryIndex == -1) return 400;
  else if(deliveryIndex == -2) return 404;
}

function idDelete(deliveryID){
  let deliveryIndex = idFound(deliveryID);
  if(deliveryIndex > -1){
    let deliveryJSON = fs.readFileSync('./Logical/deliveries.json', 'utf8');
    var deliveries = JSON.parse(deliveryJSON);
    deliveries.deliveries.splice(deliveryIndex, 1);
    let newJson = JSON.stringify(deliveries);
    fs.writeFileSync('./Logical/deliveries.json', newJson);
//    console.log("delivery deleted at deliveryIndex: ", deliveryIndex);
    return 204;
  }
  else if(deliveryIndex == -1) return 400;
  else if(deliveryIndex == -2) return 404;
}


module.exports.idFound = idFound;
module.exports.idGet = idGet;
module.exports.idDelete = idDelete;
