var fs = require('fs');

function GETdelivery(){

    let imported = fs.readFileSync('db/deliveries.json', 'utf8');
  
    return {"status": 200, "Deliveries":['deliveries']};
  
  }
  
  module.exports = GETdelivery;