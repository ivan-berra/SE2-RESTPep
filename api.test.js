const http = require('http');
const request = require('request');
const fs = require('fs');
const url = 'https://se2-restpep-dev.herokuapp.com/';

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
	};

	request.post(options, (error, response, body) => {
		//console.log(body);
		expect(body).toEqual("201 CREATED");

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
