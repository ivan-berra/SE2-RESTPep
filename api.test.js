var http = require('http');
var request = require('request');

test('Tries to connect to  the server', () => {

	http.get('http://localhost:3000/', (res) => {
		res.on('data', (d) => {		
			expect(String(d)).toBe('Hello World!');
		});
	});

});

test('Tries to post a tasks', () => {
	var options = {
		uri: 'http://localhost:3000/tasks',
		method: 'POST',
 		json: {aperta:false,consegna:"Di che colore è il mare? | rosso | blu | verde | giallo",risoluzione:"2",punteggiomax:10}
	};

	request.post(options, (error, response, body) => {
		//console.log(body);
		expect(body).toEqual({aperta:false,consegna:"Di che colore è il mare? | rosso | blu | verde | giallo",risoluzione:"2",punteggiomax:10, id:1});

	});
});



