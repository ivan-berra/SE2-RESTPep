/*test('Tries to connect to  the server', () => {
	var https = require("https");
	var testRes;

	https = require("https");

	https.get('https://se2-restpep-dev.herokuapp.com/', (res) => {
		
		res.on('data', (d) => {		
			expect(String(d)).toBe('Hello World!');
		});
	});

});
*/
let ex ={tasks : [1,5,7,89]};

var fetch = require('node-fetch');

//const url = 'https://se2-restpep-dev.herokuapp.com';

const url = 'http://localhost:3000/';

const file = 'db/users.json';

test('GET test', () => {

    expect.assertions(1);

    let status;
    return fetch(url + 'api/taskgroups')
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then(function() {
            expect(status).toEqual(200);
        });

});

test('POST test', () => {

    expect.assertions(1);
	console.log(ex);
    let status;

    return fetch(url + 'api/taskgroups', {

            method: 'post',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(ex)

        })
        .then((res) => {
            status = res.status;
			expect(status).toEqual(200)
        })

});