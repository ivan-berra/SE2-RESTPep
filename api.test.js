test('Tries to connect to  the server', () => {
	var https = require("https");
	var testRes;

	https = require("https");

	https.get('https://se2-restpep-dev.herokuapp.com/', (res) => {
		
		res.on('data', (d) => {		
			expect(String(d)).toBe('Hello World!');
		});
	});

});


var fetch = require('node-fetch');

//const url = 'https://se2-restpep-dev.herokuapp.com';

const url = 'http://localhost:3000/';

const file = 'db/users.json';

test('GET test', () => {

    expect.assertions(1);

    var status;
    return fetch(url + 'api/taskgroups')
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then(function() {
            expect(status).toEqual(200);
        });

});