const express = require('express');
const bodyParser = require('body-parser');
const getDeliveryExamId = require('./core/delivery/GETdeliveryExamId').getDeliveryExamId;
const deleteDeliveryExamId = require('./core/delivery/DELETEdeliveryExamId');
const postgetDelivery = require('./core/delivery/POSTdelivery');
const GETdeliveriesId = require('./core/delivery/GETdeliveriesId');
const GETdelivery = require('./core/delivery/GETdelivery')
const POSTdelivery = require('./core/delivery/POSTdelivery')

const url = 'https://se2-restpep-dev.herokuapp.com';

const app = express();

const PORT = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT, () => console.log('Example app listening on port ' + PORT))


app.get('/', (req, res) => {
    res.status(200);
    res.send('Hello World!');
})

/*app.get('/api/deliveries/:id', (req, res) => {
	let toSend = GETdeliveriesId(parseInt(req.params.id));
 	res.setHeader('Content-Type', 'application/json');
	res.status(toSend.status);
	if (toSend.status == 200) {
		res.send(toSend.jsonData);
    	}else{
	res.send();
	}
}) */

//GET di una richiesta a delivery
app.get('/api/deliveries', function(req, res) {

    res.contentType('application/json');
    var result = GETdelivery();
    res.status(200);
    res.send(result.jsonData);
});

//POST di una deliveries nuova
app.post('/api/deliveries', function(req, res) {

	var body = req.body;
	console.log(body.examId);
    var result = POSTdelivery.postdelivery(body.examId,body.testedId,body.reviewedId,body.examples);
    res.status(result.status);

    if (result.status != 200)
        message = { "message": "Error: " + result.status };
    else
        message = { 'url': url + "api/taskgroups/" + result.jsonData.id };

    console.log(message);

    res.send(message);

});
//delete by Ivan Berra
app.delete('/api/deliveries/:examId', function(req, res) {

    var message;

    var searchedId = req.params.examId;

    res.contentType('application/json');

    var result = deleteDeliveryExamId(Number.parseInt(searchedId));

    res.status(result.status);

    console.log(result.status);

    if (result.status != 204)
        message = { "message": "Error: " + result.status };

    console.log(message);

    res.send(message);

});


/*
app.get('/deliveries/e/:examID', (req, res) => {
	try{
		let deliveryJson = getDeliveryExamId(req.params.examID);
		if(deliveryJson.status == 400){
			res.status(400);
			res.send("400 BAD REQUEST");
		}
		else if(deliveryJson.status == 404){
			res.status(404);
			res.send("404 ID NOT FOUND");
		}
		else if(deliveryJson.status == 200){
			res.contentType('application/json');
			res.status(200);
			res.json(deliveryJson.jsonData);
		}
	}catch(error){console.log(error);}
})

app.post('/deliveries', function (req, res) {

	var deli = req.body;
    var result = postgetDelivery.postdelivery(deli.exam_id, deli.id_tested, deli.id_reviewed, deli.examples);
    res.status(result.status);
	if(result.jsonData != null)
	{
        res.send({ 'url': url + "api/users/" + result.jsonData.id });

	}
	else
	{
		console.log("I dati ricevuti sono incompleti per creare una delivery.");
		res.send("Error: " + result.status);
	};
})

app.get('/api/deliveries', (req, res) => {
	try{
        let delivery = postgetDelivery.getdelivery();
        res.contentType('application/json');
		res.status(200);
        res.send(delivery.jsonData);
	}catch(error){console.log(error);}
})

app.delete('/deliveries/e/:examID', (req, res) => {
	try{
		let response = deleteDeliveryExamId(req.params.examID);
		if(response.status == 204){
			res.status(200); //per qualche motivo mettendo 204 non manda la stringa "204 DELIVERY DELETED"
			res.send("204 DELIVERY DELETED");
		}
		else if(response.status == 400){
			res.status(400);
			res.send("400 BAD REQUEST");
		}
		else if(response.status == 404){
			res.status(404);
			res.send("404 ID NOT FOUND");
		}
	}catch(error){console.log(error);}
})
*/

