const fs = require('fs');
const esisteDeliveryExamId = require('./esisteDeliveryExamId');
const retreiveBackup = require('../core/retreiveBackup');
const resetJSON = require('../core/resetJSON');

const file = './db/deliveries.json';

function getDeliveryExamId(examId){
  let examID = parseInt(examId);
  let response = {"status": null, "jsonData": []};

  if (examID >= 0 && typeof examID === "number") {
    let deliveryIndex = esisteDeliveryExamId(examID);
    if(deliveryIndex > -1){
      let fileBackup = retreiveBackup(file);
      do{
        let deliveryJSON = fs.readFileSync(file, 'utf8');
        var deliveries = JSON.parse(deliveryJSON);
    //    console.log("delivery taken at deliveryIndex: ", deliveryIndex);
        response.jsonData.push(deliveries.deliveries[deliveryIndex]);
        deliveries.deliveries.splice(deliveryIndex, 1);
        let newJson = JSON.stringify(deliveries);
        fs.writeFileSync(file, newJson);
        deliveryIndex = esisteDeliveryExamId(examID);
      }while(deliveryIndex != -1);

      resetJSON(file, fileBackup);
      response.status = 200;
      return response;
    }
    else if(deliveryIndex == -1) {response.status = 404; return response;}
  }
  else {response.status = 400; return response;}
}

module.exports.getDeliveryExamId = getDeliveryExamId;
