const express = require('express');
const app = express();
const DeliveryId = require('./core/DeliveryId');
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log('Example app listening on port ' + PORT))

app.get('/deliveries/e/:deliveryID', (req, res) => {
	res.contentType('application/json');
	try{
		let deliveryJson = DeliveryId.idGet(req.params.deliveryID);
		if(deliveryJson == 400){
			res.status(400);
			res.send("400 BAD REQUEST");
		}
		if(deliveryJson == 404){
			res.status(404);
			res.send("404 ID NOT FOUND");
		}
		else{
			res.status(200);
			res.json(deliveryJson);
		}
	}catch(error){console.log(error);}
})

app.delete('/deliveries/e/:deliveryID', (req, res) => {
	try{
		let check = DeliveryId.idDelete(req.params.deliveryID);
		if(check == 204){
			res.status(200); //per qualche motivo mettendo 204 non manda la stringa "204 DELIVERY DELETED"
			res.send("204 DELIVERY DELETED");
		}
		else if(check == 400){
			res.status(400);
			res.send("400 BAD REQUEST");
		}
		else if(check == 404){
			res.status(404);
			res.send("404 ID NOT FOUND");
		}
	}catch(error){console.log(error);}
})
// supertest
