const url = 'http://localhost:3000';
var fetch = require('node-fetch');
const https = require('http');

const retreiveBackup = require('../core/retreiveBackup');
const resetJSON = require('../core/resetJSON');

const fileUser = 'db/users.json';
const fileTasks = 'db/tasks.json';

let fileBackupUser = null;
let fileBackupTasks = null;

beforeAll(() => {
    fileBackupUser = retreiveBackup(fileUser);
    fileBackupTasks = retreiveBackup(fileTasks);
})

afterEach(() => {
    resetJSON(fileUser, fileBackupUser);
    resetJSON(fileTasks, fileBackupTasks);
})


var testData = { matricola: 200000, email: 'prova@prova.it', isTeacher: false };
var validTask = { aperta: true, consegna: "test post", risoluzione: "risposta...", punteggiomax: 10 };



test('Prova di connessione', () => {

    expect.assertions(1);

    var status;

    return fetch(url + '/')
        .then((res) => {
            status = res.status;
            expect(status).toEqual(200);
        })

});

test('GET test', () => {

    expect.assertions(1);

    var status;
    return fetch(url + '/api/users')
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then(function() {
            expect(status).toEqual(200);
        });

});

test('GET(id) test', () => {

    expect.assertions(1);

    var status;
    return fetch(url + '/api/users/0')
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then((jsonData) => {
            console.log(jsonData);
            console.log(status);
        })
        .then(function() {
            expect(status).toEqual(200);
        });

});


test('POST test', () => {

    expect.assertions(1);

    let status;
    let jsonData;

    return fetch(url + '/api/users', {

            method: 'post',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(testData)

        })
        .then((res) => {
            status = res.status;
            expect(status).toEqual(200)
        })

});


test('PUT(id) test', () => {

    expect.assertions(1);

    let status;
    let jsonData;

    return fetch(url + '/api/users/0', {

            method: 'put',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(testData)

        })
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then((jsonData) => {
            console.log(jsonData);
            console.log(status);
            expect(status).toEqual(200);
        })
        .catch((err) => {
            console.log(err);
        })

});

test('DELETE(id) test', () => {

    expect.assertions(1);

    let status;

    return fetch(url + '/api/users/0', {

            method: 'delete',

        })
        .then((res) => {
            status = res.status;
            expect(status).toEqual(204);
        })
        .catch((err) => {
            console.log(err);
        })

});

//--------------- TASKS TEST --------------------

test('GET tasks test', () => {

    expect.assertions(1);

    var status;
    return fetch(url + '/api/tasks')
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then(function() {
            expect(status).toEqual(200);
        });

});

test('GET tasks(id) test', () => {

    expect.assertions(1);

    var status;
    return fetch(url + '/api/tasks/0')
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then((jsonData) => {
            // console.log(jsonData);
            // console.log(status);
        })
        .then(function() {
            expect(status).toEqual(200);
        });

});


test('POST tasks test', () => {

    expect.assertions(1);

    let status;
    //let jsonData;

    return fetch(url + '/api/tasks', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(validTask)
        })
        .then((res) => {
            status = res.status;
            expect(status).toEqual(201)
        })

});


test('PUT tasks(id) test', () => {

    expect.assertions(1);

    let status;
    //let jsonData;

    return fetch(url + '/api/tasks/0', {

            method: 'put',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(validTask)

        })
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then(() => {
            //console.log(jsonData);
            //console.log(status);
            expect(status).toEqual(200);
        })
        .catch((err) => {
            console.log(err);
        })

});

test('DELETE tasks(id) test', () => {

    expect.assertions(1);

    let status;

    return fetch(url + '/api/tasks/0', {

            method: 'delete',

        })
        .then((res) => {
            status = res.status;
            expect(status).toEqual(204);
        })
        .catch((err) => {
            console.log(err);
        })

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