const url = 'https://se2-restpep-dev.herokuapp.com/';

const https = require('https');

test('Trying to connect to the server', () => {

	var https = require("https");

	var testRes;

	https = require("https");

	https.get(url, (res) => {
		
		res.on('data', (d) => {		
			expect(String(d)).toBe('Hello World!');
		});
	});

});


/*test('Trying to create a new user through POST', () => {
	
	var data = JSON.stringify({
		matricola: 200000,
		email: "prova@prova.it",
		isTeacher: false
	});

	var options = {
		host: url,
		port: 3000,
		path: '/api/users/',
		headers: {
			'Content-Type': 'application/json',
		}
	};

	var req = https.request(options, function(res) {
	
		res.setEncoding('utf8');
		res.on('data', function(chunk){
		    console.log("body: " + chunk);
		})
	});	

	req.write(data);

        
    
});*/
