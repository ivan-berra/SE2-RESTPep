var fs = require('fs');

function GETdelivery(){

    let imported = fs.readFileSync('db/deliveries.json', 'utf8');
    let obj = JSON.parse(imported);
  
    return {"status": 200, "jsonData": obj.deliveries };
  }
  
  module.exports = GETdelivery;