const url = 'http://localhost:3000/';
var fetch = require('node-fetch');

const retreiveBackup = require('../core/retreiveBackup');
const resetJSON = require('../core/resetJSON');
const fileDeliveries = 'db/deliveries.json';


let fileBackupDeliveries = null;

beforeAll(() => {
    fileBackupDeliveries = retreiveBackup(fileDeliveries);
})

afterEach(() => {
    resetJSON(fileDeliveries, fileBackupDeliveries);
})

let ex = {
    "examId":3,
    "testedId":1,
    "reviewedId":2,
    "examples":
    [ 
        {
            "id":1,
            "soluzione":"false",
            "punteggio":1
        },
        {
            "id":2,
            "soluzione":"false",
            "punteggio":0
        },
        {
            "id":3,
            "soluzione":"true",
            "punteggio":0
        }
    ]
}



test('Prova di connessione', () => {

    expect.assertions(1);

    var status;

    return fetch(url)
        .then((res) => {
            status = res.status;
            expect(status).toEqual(200);
        })

});

test('GET deliveries test', () => {

    expect.assertions(1);
    
        let status;
        return fetch(url + 'api/deliveries')
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
    let status;

    return fetch(url + 'api/deliveries', {

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
//test delete by Ivan Berra
test('DELETE deliveries(examId) test', () => {

    expect.assertions(1);

    let status;

    return fetch(url + 'api/deliveries/1', {

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

/*test('GET deliveries(id) test', () => {

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
