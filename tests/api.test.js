const url = 'http://localhost:3000';
var fetch = require('node-fetch');

const deli = require('../core/GET&POSTdelivery');
const retreiveBackup = require('../core/retreiveBackup');
const resetJSON = require('../core/resetJSON');

const fileDeliveries = 'db/deliveries.json';


let fileBackupDeliveries = null;
let fileBackupTasks = null;

beforeAll(() => {
    fileBackupDeliveries = retreiveBackup(fileDeliveries);
})

afterEach(() => {
    resetJSON(fileDeliveries, fileBackupDeliveries);
})


test('Prova di connessione', () => {

    expect.assertions(1);

    var status;

    return fetch(url + '/')
        .then((res) => {
            status = res.status;
            expect(status).toEqual(200);
        })

});

test('GET deliveries(id) test', () => {

    expect.assertions(1);

    var status;
    return fetch(url + '/api/deliveries/0')
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then(function() {
            expect(status).toEqual(200);
        });

});

/*
test('GET deliveries test', () => {

    var status;
    fetch(url + '/deliveries')
        .then((res) => {
            status = res.status;
            return res.json();
        })
        .then(function() {
            expect(status).toEqual(200);
        });

});

var examples = {
	"id":1,
    "soluzione":"false",
    "punteggio":1
}

test('POST deliveries test', () => {

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
        })
});
*/
