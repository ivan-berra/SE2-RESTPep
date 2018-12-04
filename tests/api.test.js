const url = 'https://exam-feature-api.herokuapp.com/';

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

=======
var http = require('http');
var request = require('request');

test('Tries to connect to  the server', () => {

	http.get('http://localhost:3000/', (res) => {
		res.on('data', (d) => {
>>>>>>> 75d32c9faab9d2d54b75a091523cab7984594f0e

		res.on('data', (d) => {

		        console.log(String(d));

			expect(String(d)).toEqual(String(testData));
const http = require('http');
const request = require('request');
const fs = require('fs');
const url = 'https://exam-feature-api.herokuapp.com/';

//const url = 'http://localhost';

//const port = process.env.PORT || 3000;

const https = require('https');

test('Trying to connect to the server', () => {

	https.get(url, (res) => {

	    res.on('data', (d) => {
			expect(String(d)).toEqual('Hello World!');
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

/*
test('Tries to get exams', () => {
  let options = {
    uri: 'http://localhost:3000/exams',
    method: 'GET'
  };

  let examJson = fs.readFileSync('./exams.json', 'utf8', function(err, data){
  	if (err) throw err;
  	let parsedJson = JSON.parse(data);
  });
  let exams = JSON.parse(examJson);

  request.get(options, (error, response, body) => {
    expect(body).toEqual(JSON.stringify(exams));
  })
});

test('Tries to post an exam', () => {
	let options = {
		uri: 'http://localhost:3000/exams',
		method: 'POST',
 		json: {"destinatario": 133,
          "deadline": "2008-12-25T09:00:00Z",
          "tasksarray":[11,22,31],
          "autore": 12137,
          "condivisi": [12171, 28117]}

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

test('Tries to get an exam by id 1', () => {
  let options = {
    uri: 'http://localhost:3000/exams/1',
    method: 'GET'
  };

  let examJson = fs.readFileSync('./exams.json', 'utf8', function(err, data){
  	if (err) throw err;
  	let parsedJson = JSON.parse(data);
  });
  let exams = JSON.parse(examJson);

  request.get(options, (error, response, body) => {
    expect(body).toEqual(JSON.stringify(exams.exams[0]));
  })
});

test('Tries to get an exam by unexisting id', () => {
  let options = {
    uri: 'http://localhost:3000/exams/19999',
    method: 'GET'
  };

  request.get(options, (error, response, body) => {
    expect(body).toBe("404 ID NOT FOUND");
  })
});

test('Tries to get an exam by unvalid id', () => {
  let options = {
    uri: 'http://localhost:3000/exams/testtest',
    method: 'GET'
  };

  request.get(options, (error, response, body) => {
    expect(body).toBe("400 BAD REQUEST");
  })
});

 test('Tries to delete an exam by id 2', () => {
   let options = {
     uri: 'http://localhost:3000/exams/2',
     method: 'DELETE'
   };
   request.delete(options, (error, response, body) => {
     expect(body).toBe("204 EXAM DELETED");
   })
 });

 test('Tries to delete an exam by unexisting id 9090', () => {
   let options = {
     uri: 'http://localhost:3000/exams/9090',
     method: 'DELETE'
   };
   request.delete(options, (error, response, body) => {
     expect(body).toBe("404 EXAM NOT FOUND");
   })
 });

 test('Tries to delete an exam by unvalid id', () => {
	 let options = {
		 uri: 'http://localhost:3000/exams/testest',
		 method: 'DELETE'
	 };
	 request.delete(options, (error, response, body) => {
		 expect(body).toBe("400 BAD REQUEST");
	 })
 });
*/
