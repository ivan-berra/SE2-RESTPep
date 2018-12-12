var esisteDeliveryExamId = require("./esisteDeliveryExamId");

var fs = require('fs');

function deleteDeliveryExamId(searchedExamId) {

    if (searchedExamId >= 0 && typeof searchedExamId === "number") {
        
        let searchedDelivery = esisteDeliveryExamId(searchedExamId);

        if (searchedDelivery == -1)

            return { "status": 404, "jsonData": null };
        
        else {

            do{

                let imported = fs.readFileSync('db/deliveries.json', 'utf8');

                let consegne = JSON.parse(imported);

                consegne.deliveries.splice(searchedDelivery, 1);

                let exported = JSON.stringify(consegne);

                fs.writeFileSync('db/deliveries.json', exported);

                searchedDelivery = esisteDeliveryExamId(searchedExamId);

            } while(searchedDelivery != -1);

            return { "status": 204, "jsonData": null };

        }

    } else return { "status": 400, "jsonData": null };

}

module.exports = deleteDeliveryExamId;