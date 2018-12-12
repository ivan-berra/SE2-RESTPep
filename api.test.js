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

const deli = require('./core/delivery/POSTdelivery');

const file = 'db/deliveries.json'

var fetch = require('node-fetch');

const url = 'https://se2-restpep-dev.herokuapp.com/';

//const url = 'http://localhost:3000/';

test('GET deliveries test', () => {

expect.assertions(1);

    let status;
    return fetch(url + 'api/deliveries')
        .then((res) => {
            status = res.status;
            expect(status).toEqual(200);
        })
        .catch((err) => {
            expect(status).toEqual(404);
            console.log(err);
        });

});

var examples = {
	"id":1,
    "soluzione":"false",
    "punteggio":1
}

/*test('POST deliveries test', () => {

    var status;
    fetch(url + '/deliveries',{
		method: 'post',

		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},

		body: JSON.stringify(examples)
	})
        .then((res) => {
            status = res.status;
            expect(status).toEqual(200);
            return res.json();
        })
});*/