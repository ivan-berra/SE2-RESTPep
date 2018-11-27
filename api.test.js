const url = 'http://se2-restpep-dev.herokuapp.com/';

//const url = 'http://localhost';

//const port = process.env.PORT || 3000;

const https = require('https');

//var testData = JSON.stringify({matricola: 200000,email: 'prova@prova.it',isTeacher: false});


test('Trying to connect to the server', () => {
	
	https.get(url, (res) => {
		
	    res.on('data', (d) => {		
			expect(String(d)).toEqual('Hello World!');
		});
	});

});

/*
test('Trying to create a new user through POST', () => {

	var options = {
		host: 'localhost',
		port: 3000,
	    	path: '/api/users',
	    	method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': testData.length
		}
	};

	console.log(testData);
	
	var req = https.request(options, function(res) {

		res.on('data', (d) => {

			console.log(JSON.stringify(d));			

		  	expect(String((d))).toEqual(String(testData)); 
		});

	});	
	
	req.write(testData);
	req.end();
    
});


test('Trying to find the previously created user through GET', () => {

	
	https.get('http://localhost:3000/api/users/1', (res) => {
		
		res.on('data', (d) => {		

		        console.log(String(d));			

			expect(String(d)).toEqual(String(testData));
		});

	});
});

test('Trying to delete the previously created user through DELETE', () => {


        var options = {
		host: 'localhost',
		port: 3000,
		path: '/api/users/1',
	    	method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		}
	};
    
	https.request(options, (res) => {
		
		res.on('data', (d) => {		

		        console.log(String(d));			

			expect(String(d)).toEqual(String(testData));
		});

	});
});
*/
