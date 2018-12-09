const delivery = require('./DeliveryId');

const fs = require('fs');

function GETdeliveryId(id) {
	let res = {status: null, jsonData: null};
	let check = delivery.idFoundDelivery(id);
	if(check>=0){
		try{
			let data = fs.readFileSync('db/deliveries.json', 'utf8');
			var obj = JSON.parse(data);
			let index = obj.deliveries.findIndex(task => task.id == id);
			res.status = 200;
			res.jsonData = obj.deliveries[index];
			return res;

		}catch(error){
			console.log(error);	
			res.status = 500;
			res.jsonData = "500 INTERNAL SERVER ERROR";
			return res;
		}
	}
	else if(check==-1){
		res.status = 400;
		res.jsonData = "400 BAD REQUEST";
		return res;
	}
	else{
		res.status = 404;
		res.jsonData = "404 NOT FOUND";
		return res;
	}

}

module.exports = GETdeliveryId;

