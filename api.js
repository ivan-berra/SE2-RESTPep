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

    var result = userPost(user.matricola, user.email, user.isTeacher);

    res.status(result.status);

    if (result.jsonData == null)
        res.send("Error: " + result.status);
    else
        res.send({ 'url': url + "api/users/" + result.jsonData.id });

});

app.get('/api/users', function(req, res) {

    res.contentType('application/json');
    var result = userGet();
    res.status(200);
    res.send(result.jsonData);
})

app.get('/api/users/:userId', function(req, res) {

    var searchedId = req.params.userId;

    res.contentType('application/json');

    var result = userGetId(Number.parseInt(searchedId));

    res.status(result.status);

    if (result.jsonData == null)
        res.send({ "message": "Error: " + result.status });
    else
        res.send(result.jsonData);

});

app.delete('/api/users/:userId', function(req, res) {

    var searchedId = req.params.userId;

    res.contentType('application/json');

    var result = userDeleteId(Number.parseInt(searchedId));

    res.status(result.status);

    if (result.status != 204)
        res.send({ "message": "Error: " + result.status });
    else
        res.send({ "message": "User deleted" });

});

app.put('/api/users/:userId', function(req, res) {

    var user = req.body;

    var searchedId = req.params.userId;

    res.contentType('application/json');

    var result = userPutId(Number.parseInt(searchedId), user.matricola, user.email, user.isTeacher);

    res.status(result.status);

    if (result.status != 200)
        res.send({ "message": "Error: " + result.status });
    else
        res.send({ "message": "User modified" });

});