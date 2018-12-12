const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const url = 'https://se2-restpep-dev.herokuapp.com';
const fs = require('fs');
const PORT = process.env.PORT || 3000;
//USER DEPENDENCIES
const GETuser = require('./core/users/GETuser');
const GETuserId = require('./core/users/GETuserId');
const DELETEuserId = require('./core/users/DELETEuserId');
const PUTuserId = require('./core/users/PUTuserId');
const POSTuser = require('./core/users/POSTuser');
//TASK DEPENDENCIES
const GETtasks = require('./core/tasks/GETtasks');
const GETtasksId = require('./core/tasks/GETtasksId');
const POSTtasks = require('./core/tasks/POSTtasks');
const PUTtasksId = require('./core/tasks/PUTtasksId');
const DELETEtasksId = require('./core/tasks/DELETEtasksId');
//GROUP DEPENDENCIES
const POSTgroup = require('./core/groups/POSTgroup');
const GETgroup = require('./core/groups/GETgroup');
const GETgroupId = require('./core/groups/GETgroupId');
const DELETEgroupId = require('./core/groups/DELETEgroupId');
const PUTgroupId = require('./core/groups/PUTgroupId');
//EXAM DEPENDENCIES
const GETexams = require('./core/exams/GETexams');
const GETexamsId = require('./core/exams/GETexamsId');
const POSTexams = require('./core/exams/POSTexams');
const PUTexamsId = require('./core/exams/PUTexamsId');
const DELETEexamsId = require('./core/exams/DELETEexamsId');
//DELIVERY DEPENDENCIES
const getDeliveryExamId = require('./core/delivery/GETdeliveryExamId');
const DELETEdeliveryExamId = require('./core/delivery/DELETEdeliveryExamId');
const GETdeliveriesId = require('./core/delivery/GETdeliveriesId');
const GETdelivery = require('./core/delivery/GETdelivery')
const POSTdelivery = require('./core/delivery/POSTdelivery')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT, () => console.log('Example app listening on port ' + PORT))



app.get('/', (req, res) => {
    res.status(200);
    res.send('Hello World!');
})



//Users
app.post('/api/users', function(req, res) {

    var user = req.body;

    var message;

    var result = POSTuser(user.matricola, user.email, user.isTeacher);

    res.status(result.status);

    if (result.status != 200)
        message = { "message": "Error: " + result.status };
    else
        message = { 'url': url + "api/users/" + result.jsonData.id };

    process.on('uncaughtException', function(err) {
        console.error((new Date).toUTCString() + 'UncaughtException:', err.message);
        console.error(err.stack);
        res.status(500).send({ "message": "Error: " + 500 });
        process.exit(1);
    })
    res.send(message);

});

app.get('/api/users', function(req, res) {

    res.contentType('application/json');
    var result = GETuser();
    res.status(200);

    res.send(result.jsonData);
})

app.get('/api/users/:userId', function(req, res) {

    var message;

    var searchedId = req.params.userId;

    res.contentType('application/json');

    var result = GETuserId(Number.parseInt(searchedId));

    res.status(result.status);

    if (result.status != 200)
        message = { "message": "Error: " + result.status };
    else
        message = result.jsonData;

    res.send(message);

});

app.delete('/api/users/:userId', function(req, res) {

    var message;

    var searchedId = req.params.userId;

    res.contentType('application/json');

    var result = DELETEuserId(Number.parseInt(searchedId));

    res.status(result.status);

    if (result.status != 204)
        message = { "message": "Error: " + result.status };

    //il messaggio è undefined se l'eliminazione è andata a buon fine
    //204 indica No Content e non accetta nessun corpo

    res.send(message);

});

app.put('/api/users/:userId', function(req, res) {

    var user = req.body;

    var message;

    var searchedId = req.params.userId;

    res.contentType('application/json');

    var result = PUTuserId(Number.parseInt(searchedId), user.matricola, user.email, user.isTeacher);

    res.status(result.status);

    if (result.status != 200)
        message = { "message": "Error: " + result.status };
    else
        message = { "message": "Utente modificato" };


    res.send(message);


});



//Exams
app.get('/api/exams', (req, res) => {
    let response = GETexams();
    if (response.status != 500) {
        res.contentType('application/json');
        res.status(response.status);
        res.json(response.jsonData);
    } else if (response.status == 500) {
        res.status(response.status);
        res.send("500 INTERNAL SERVER ERROR");
    }
})

app.post('/api/exams', (req, res) => {
    let response = POSTexams(req.body);
    console.log("Response: ", response);
    if (response.status == 201) {
        res.status(response.status);
        res.send("201 EXAM CREATED WITH ID: " + response.examId.toString());
    } else if (response.status == 400) {
        res.status(response.status);
        res.send("400 BAD REQUEST");
    }
})

app.get('/api/exams/:examID', (req, res) => {
    try {
        let response = GETexamsId(req.params.examID);
        if (response.status == 200) {
            res.contentType('application/json');
            res.status(response.status);
            res.json(response.jsonData);
        }
        if (response.status == 400) {
            res.status(response.status);
            res.send("400 BAD REQUEST");
        }
        if (response.status == 404) {
            res.status(response.status);
            res.send("404 ID NOT FOUND");
        }
    } catch (error) { console.log(error); }
})

app.delete('/api/exams/:examID', (req, res) => {
    try {
        let check = DELETEexamsId(req.params.examID);
        if (check == 204) {
            res.status(200); //per qualche motivo mettendo 204 non manda la stringa "204 EXAM DELETED"
            res.send("204 EXAM DELETED");
        } else if (check == 400) {
            res.status(400);
            res.send("400 BAD REQUEST");
        } else if (check == 404) {
            res.status(404);
            res.send("404 ID NOT FOUND");
        }
    } catch (error) { console.log(error); }
})

app.put('/api/exams/:examID', (req, res) => {
    try {
        let check = PUTexamsId(req.body, req.params.examID);
        if (check == 202) {
            res.status(202);
            res.send("202 EXAM MODIFIED");
        } else if (check == 400) {
            res.status(400);
            res.send("400 BAD REQUEST");
        } else if (check == 404) {
            res.status(404);
            res.send("404 ID NOT FOUND");
        }
    } catch (error) { console.log(error); }
})



//Tasks
app.get('/api/tasks', (req, res) => {

    let toSend = GETtasks();
    res.setHeader('Content-Type', 'application/json');
    res.status(toSend.status);
    res.send(toSend.jsonData);

})

app.get('/api/tasks/:id', (req, res) => {

    let toSend = GETtasksId(parseInt(req.params.id));
    res.status(toSend.status);
    if (toSend.status == 200) {
        res.send(toSend.jsonData);
    }

})

app.post('/api/tasks', (req, res) => {

    let toSend = POSTtasks(req.body);
    res.status(toSend.status);
    if (toSend.status == 201) {
        res.send(toSend.id.toString());
    }

})

app.put('/api/tasks/:id', (req, res) => {

    let toSend = PUTtasksId(req.body, req.params.id);
    res.status(toSend);
    res.send(toSend.toString());
})

app.delete('/api/tasks/:id', (req, res) => {

    let toSend = DELETEtasksId(req.params.id);
    res.status(toSend);
    res.send();
})



//Groups
app.post('/api/groups', function(req, res) {
    let dati = req.body;
    let message;
    let result = POSTgroup(dati.groupname, dati.userlist);
    res.status(result.status);
    if (result.status == 400)
        message = { "message": "Error: " + result.status };
    else if (result.status == 200)
        message = { 'url': url + "api/groups/" + result.id };
    console.log(message);
    process.on('uncaughtException', function(err) {
        console.error((new Date).toUTCString() + 'UncaughtException:', err.message);
        console.error(err.stack);
        res.status(500).send({ "message": "Error: " + 500 });
        process.exit(1);
    })
    res.send(message);
});

app.get('/api/groups', function(req, res) {
    res.contentType('application/json');
    let result = GETgroup();
    res.status(200);
    res.send(result);
})

app.get('/api/groups/:groupId', function(req, res) {
    let message;
    let searchedId = req.params.groupId;
    res.contentType('application/json');
    let result = GETgroupId(Number.parseInt(searchedId));
    res.status(result.status);
    if (result.status != 200)
        message = { "message": "Error: " + result.status };
    else
        message = result.jsonData;
    console.log(message);
    res.send(message);
});

app.delete('/api/groups/:groupId', function(req, res) {
    let message;
    let searchedId = req.params.groupId;
    res.contentType('application/json');
    let result = DELETEgroupId(Number.parseInt(searchedId));
    res.status(result);
    console.log(result);
    if (result != 204)
        message = { "message": "Error: " + result };
    console.log(message); //il messaggio è undefined se l'eliminazione è andata a buon fine
    //204 indica No Content e non accetta nessun corpo
    res.send(message);
});


app.put('/api/groups/:groupId', function(req, res) {
    let groups = req.body;
    let message;
    let searchedId = req.params.groupId;
    res.contentType('application/json');
    let result = PUTgroupId(Number.parseInt(searchedId), groups.nomegruppo, groups.membri);
    res.status(result);
    if (result != 200)
        message = { "message": "Error: " + result };
    else
        message = { "message": "Gruppo modificato" };
    console.log(message);
    res.send(message);
});



//Deliveries
app.get('/api/deliveries/:id', (req, res) => {
    let toSend = GETdeliveriesId(parseInt(req.params.id));
    res.setHeader('Content-Type', 'application/json');
    res.status(toSend.status);
    if (toSend.status == 200) {
        res.send(toSend.jsonData);
    } else {
        res.send();
    }
})

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
    var result = POSTdelivery.postdelivery(body.examId, body.testedId, body.reviewedId, body.examples);
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

    var result = DELETEdeliveryExamId(Number.parseInt(searchedId));

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
		let response = DELETEdeliveryExamId(req.params.examID);
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