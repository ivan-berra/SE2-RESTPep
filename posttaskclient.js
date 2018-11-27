
var request = require('request');

var options = {
  uri: 'http://localhost:3000/tasks',
  method: 'POST',
  json: {
aperta:false,consegna:"Di che colore è il mare? | rosso | blu | verde | giallo",risoluzione:"A",punteggiomax:10}
};

request.post(options, (error, response, body) => {
	//console.log(body);
});

