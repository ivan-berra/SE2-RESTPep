const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//moduli
const GETtaskgroup = require('./core/taskgroup/GETtaskgroup');
const POSTtaskgroup = require('./core/taskgroup/POSTtaskgroup')

//const url = 'https://se2-restpep-dev.herokuapp.com';

const url = 'http://localhost:3000/';

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log('Example app listening on port ' + PORT))

app.post('/api/taskgroups', function(req, res) {

    var body = req.body;
    var result = POSTtaskgroup.POSTtaskgroup(body.tasks);

    res.status(result.status);

    if (result.status != 200)
        message = { "message": "Error: " + result.status };
    else
        message = { 'url': url + "api/taskgroups/" + result.jsonData.id };

    console.log(message);

    res.send(message);

});

app.get('/api/taskgroups', function(req, res) {

    res.contentType('application/json');
    var result = GETtaskgroup();
    res.status(200);

    res.send(result.jsonData);
});
