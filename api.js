const express = require('express')
const userGet = require('./core/userget');
const userGetId = require('./core/usergetid');
const userDeleteId = require('./core/userdeleteid');
const userPutId = require('./core/userputid');
const userPost = require('./core/userpost');
const bodyParser = require('body-parser');

const url = 'http://localhost:3000/';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.status(200);
    res.send('Hello World!');
})

app.listen(PORT, () => console.log('Example app listening on port ' + PORT))


app.post('/api/users', function(req, res) {

    var user = req.body;

    var message;

    var result = userPost(user.matricola, user.email, user.isTeacher);

    res.status(result.status);

    if (result.status != 200)
        message = { "message": "Error: " + result.status };
    else
        message = { 'url': url + "api/users/" + result.jsonData.id };

    console.log(message);

    res.send(message);

});

app.get('/api/users', function(req, res) {

    res.contentType('application/json');
    var result = userGet();
    res.status(200);

    res.send(result.jsonData);
})

app.get('/api/users/:userId', function(req, res) {

    var message;

    var searchedId = req.params.userId;

    res.contentType('application/json');

    var result = userGetId(Number.parseInt(searchedId));

    res.status(result.status);

    if (result.status != 200)
        message = { "message": "Error: " + result.status };
    else
        message = result.jsonData;

    console.log(message);

    res.send(message);

});

app.delete('/api/users/:userId', function(req, res) {

    var message;

    var searchedId = req.params.userId;

    res.contentType('application/json');

    var result = userDeleteId(Number.parseInt(searchedId));

    res.status(result.status);

    console.log(result.status);

    if (result.status != 200)
        message = { "message": "Error: " + result.status };
    else
        message = { "message": "User deleted" };

    console.log(message);

    res.send(message);

});

app.put('/api/users/:userId', function(req, res) {

    var user = req.body;

    var message;

    var searchedId = req.params.userId;

    res.contentType('application/json');

    var result = userPutId(Number.parseInt(searchedId), user.matricola, user.email, user.isTeacher);

    res.status(result.status);

    if (result.status != 204)
        message = { "message": "Error: " + result.status };

    console.log(message);

    res.send(message);


});