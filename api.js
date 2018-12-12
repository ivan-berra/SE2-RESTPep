const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

//moduli
const GETtaskgroup = require('./core/GETtaskgroup');



app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log('Example app listening on port ' + PORT))

app.get('/api/taskgroups', function(req, res) {

    res.contentType('application/json');
    var result = GETtaskgroup();
    res.status(200);

    res.send(result.jsonData);
})
